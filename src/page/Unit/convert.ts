import { compile_number_func, type NumberFunction } from "@/util/lang";
import measures, { type UnitItem } from "@/page/Unit/units";
import Decimal from 'decimal.js';

export function convert(fromUnit: UnitItem, toUnit: UnitItem, unitValue: number): string {
    if (fromUnit.value === toUnit.value) {
        return String(unitValue);
    }

    let toUnitValue: number | string = unitValue;
    if (!fromUnit.is_default) {
        if (fromUnit.convert) {
            // unitValue / fromUnit.convert
            toUnitValue = new Decimal(unitValue).div(new Decimal(fromUnit.convert)).toString();
        } else {
            toUnitValue = formulas[fromUnit.convert_from!](unitValue)
        }
    }

    if (!toUnit.is_default) {
        if (toUnit.convert) {
            // toUnitValue * toUnit.convert
            toUnitValue = new Decimal(toUnitValue).mul(new Decimal(toUnit.convert)).toString();
        } else {
            toUnitValue = formulas[toUnit.convert_to!](new Decimal(toUnitValue).toNumber())
        }
    }

    return String(toUnitValue);
}

export const formulas: Record<string, NumberFunction> = measures.reduce((acc, {units}) => {
    units.forEach(unit => {
        if (unit.convert_from) {
            acc[unit.convert_from] = compile_number_func(unit.convert_from);
        }
        if (unit.convert_to) {
            acc[unit.convert_to] = compile_number_func(unit.convert_to);
        }
    });
    return acc;
}, {} as Record<string, NumberFunction>);
