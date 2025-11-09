import React from "react";
import { Col, Input, Row, Select, Tabs } from "antd";
import measures, { type MeasureItem } from '@/page/Unit/units'

const { Option } = Select;

const Panel: React.FC<{ measure: MeasureItem }> = ({ measure }) => {

    const default_unit = measure.units.find(unit => unit.is_default)!

    return <Row gutter={8}>
        <Col offset={8} span={8}>
            <Input
                placeholder="Ip Address"
            />
        </Col>
        <Col span={4}>
            <Select defaultValue={default_unit.key}>
                {
                    measure.units.map(unit => {
                        return (
                            <Option key={unit.key}
                                    value={unit.key}>
                                {unit.name}
                            </Option>
                        );
                    })
                }
            </Select>
        </Col>
    </Row>;
};

const Index: React.FC = () => {

    const tab_items = measures.map(measure => {
        return {
            label: measure.name,
            key: measure.key,
            children: <Panel measure={measure}/>,
        };
    });

    return (
        <Tabs
            defaultActiveKey="length"
            tabPosition="left"
            items={tab_items}
        />)
};

export default Index;
