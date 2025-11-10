import React from "react";
import { Space, Card, Row, Col } from "antd";
import { type MeasureItem, type UnitItem } from "@/page/Unit/units";
import { chunk_array } from "@/util/lang";
import { useUnitValueStore } from "./state";
import Decimal from 'decimal.js';

const Index: React.FC<{ measure: MeasureItem }> = ({ measure }) => {
    const { unitValue } = useUnitValueStore();

    const computeValue = (unit: UnitItem) => {
        const convert = new Decimal(unit.convert);
        const v = new Decimal(unitValue).div(convert)
        return `${v} ${unit.key} ${unit.label}`;
    };

    return (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {Array.from(chunk_array(measure.units, 2)).map((arrs) => {
                return (
                    <Row gutter={16}>
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