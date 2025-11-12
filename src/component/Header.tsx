import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { TabsProps } from "antd";
import { Divider, Radio, Select, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import categories, { type ToolItem } from "./category";

const options = categories
.flatMap((category) => category.tools)
.sort((a, b) => a.value.localeCompare(b.value));

const filterOption = (input: string, option?: ToolItem) => {
    const kw = input.toLowerCase();
    return option!.value.includes(kw) || option!.label.includes(kw);
};

const get_category = (tool_value: string) => {
    return categories.find((category) =>
        category.tools.some((tool) => tool.value === tool_value)
    )?.value;
};

const Index: React.FC = () => {
    const nav = useNavigate();
    const navigate = (tool: string, category?: string) =>
        nav(category ? `/${tool}?category=${category}` : `/${tool}`);

    const location = useLocation();
    const pathname = location.pathname;
    const tool_value = pathname.startsWith("/")
        ? pathname.substring(1)
        : pathname;
    const toolCategory = get_category(tool_value);

    const tabs: TabsProps["items"] = categories.map((category) => ({
        key: category.value,
        label: category.label,
        children: (
            <Radio.Group
                defaultValue={tool_value}
                options={category.tools}
                optionType="button"
                buttonStyle="solid"
                onChange={(e) => {
                    if (e.target.value) {
                        const tool_value = e.target.value;
                        navigate(tool_value, get_category(tool_value))
                    }
                }}
            />
        ),
    }));

    return (
        <div>
            <Tabs
                defaultActiveKey={toolCategory}
                items={tabs}
                tabBarStyle={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
                tabBarExtraContent={
                    <Select
                        style={{ width: 200 }}
                        prefix={<SearchOutlined/>}
                        placeholder="搜索工具"
                        optionFilterProp="label"
                        onChange={(tool_value) => {
                            navigate(tool_value, get_category(tool_value))
                        }}
                        showSearch
                        filterOption={filterOption}
                        options={options}
                    />
                }
                onChange={(activeKey) => {
                    const tools =
                        categories.find((category) => category.value === activeKey)
                            ?.tools ?? [];
                    if (tools.length > 0) {
                        navigate(tools[0].value, activeKey);
                    }
                }}
            />
            <Divider/>
        </div>
    );
};

export default Index;
