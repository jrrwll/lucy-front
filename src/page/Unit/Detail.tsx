import React from "react";
import { Card, Col, Row, Space } from "antd";
import { type MeasureItem, type UnitItem } from "@/page/Unit/units";
import { chunk_array } from "@/util/lang";
import { convert } from './convert'

const Index: React.FC<{
    measure: MeasureItem, unitValue: number,
    fromUnit: string, toUnit: string
}> = ({ measure, unitValue, fromUnit }) => {

    const fromUnitObj = measure.units.find(unit => unit.value === fromUnit)!;

    const computeValue = (unit: UnitItem) => {
        if (!fromUnitObj) return "";
        const v = convert(fromUnitObj, unit, unitValue);
        return `${v} ${unit.value} ${unit.label}`;
    };

    return (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {Array.from(chunk_array(measure.units, 2)).map((arrs, i) => {
                return (
                    <Row gutter={16} key={`${measure.value}_${i}`}>
                        <Col span={12}>
                            <Card variant="borderless">{computeValue(arrs[0])}</Card>
                        </Col>
                        {arrs.length > 1 && (
                            <Col span={12}>
                                <Card variant="borderless">{computeValue(arrs[1])}</Card>
                            </Col>
                        )}
                    </Row>
                );
            })}
        </Space>
    );
};

export default Index;
