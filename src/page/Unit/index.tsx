import React from "react";
import { Typography, Space, Col, InputNumber, Row, Select, Tabs } from "antd";
import measures, { type MeasureItem, type UnitItem } from "@/page/Unit/units";
import Detail from "./Detail";
import { useUnitValueStore } from "./state";

const all_option: UnitItem = {
    key: "all",
    label: "全部",
    convert: 1,
};

const Panel: React.FC<{ measure: MeasureItem }> = ({ measure }) => {
    const { unitValue, setUnitValue } = useUnitValueStore()

    const default_unit = measure.units.find((unit) => unit.is_default)!;

    const filterOption = (input: string, option?: UnitItem) => {
        const kw = input.toLowerCase();
        return (
            option!.key.includes(kw) ||
            option!.label.includes(kw) ||
            (option!.pinyin?.includes(kw) ?? false)
        );
    };

    return (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Row gutter={8}>
                <Col offset={1} span={12}>
                    <InputNumber
                        addonBefore="输入"
                        value={unitValue}
                        onChange={v => {
                            if (v) {
                                setUnitValue(v);
                            }
                        }}
                        style={{ width: "16em" }}
                    />
                </Col>
                <Col span={10}>
                    <Space direction="horizontal" size="small" style={{ width: "100%" }}>
                        <Select
                            defaultValue={default_unit.label}
                            popupMatchSelectWidth={false}
                            showSearch
                            filterOption={filterOption}
                            optionFilterProp="label"
                            options={measure.units}
                        ></Select>
                        <Typography>{"<->"}</Typography>
                        <Select
                            defaultValue={"全部"}
                            popupMatchSelectWidth={false}
                            showSearch
                            filterOption={filterOption}
                            optionFilterProp="label"
                            options={[all_option, ...measure.units]}
                        ></Select>
                    </Space>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={24}>
                    <Detail measure={measure} />
                </Col>
            </Row>
        </Space>
    );
};

const Index: React.FC = () => {
    const tab_items = measures.map((measure) => {
        return {
            label: measure.label,
            key: measure.key,
            children: <Panel measure={measure} />,
        };
    });

    return (
        <Tabs defaultActiveKey="length" tabPosition="left" items={tab_items} />
    );
};

export default Index;
