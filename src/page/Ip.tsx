import React, { useState } from "react";
import { Button, Col, Input, Row, Select, Space } from "antd";
import CodeMirror from '@uiw/react-codemirror'

import { fetchGeo } from "@/thridparty/geojs";
import { convert } from "@/util/convert";
import { format_code } from "@/provider/code";
import { EXTENSIONS } from '@/thridparty/editor.ts'

const { Option } = Select;

const Index: React.FC = () => {
    const [ip, setIp] = useState("");
    const [contentJson, setContentJson] = useState("");
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("json");

    const onClick = async () => {
        const res = await fetchGeo(ip);
        const formated_json = await format_code(res, "json");
        const formated = convert(formated_json, undefined, language);

        setContentJson(formated_json);
        setContent(formated);
    };

    const onChange = (v: string | undefined) => {
        if (v !== undefined) setContent(v);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLanguageChange = (value: any) => {
        const formated = contentJson ? convert(contentJson, undefined, value) : "";
        setLanguage(value);
        setContent(formated);
    };

    return (
        <div>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Row gutter={8}>
                    <Col span={16}>
                        <Input
                            placeholder="Ip Address"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                        />
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={onClick}>
                            查询
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Select defaultValue={language} onChange={handleLanguageChange}>
                            <Option value="json">json</Option>
                            <Option value="yaml">yaml</Option>
                            <Option value="toml">toml</Option>
                            <Option value="xml">xml</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <CodeMirror
                        key={language}
                        value={content}
                        onChange={onChange}
                        minHeight={`${window.innerHeight / 2}px`}
                        minWidth={`${window.innerWidth / 2}px`}
                        extensions={EXTENSIONS}
                    />
                </Row>
            </Space>
        </div>
    );
};

export default Index;
