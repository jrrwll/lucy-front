import React, { useState } from "react";
import { Button, Col, Input, Row, Select, Space } from "antd";
import MonacoEditor from "@monaco-editor/react";

import { fetchGeo } from "@/provider/geojs";
import { convert } from "@/util/convert";
import { format_code } from "@/util/format_code.ts";
import { createHighlighterOnMount } from "@/thridparty/editor";

const { Option } = Select;

const Index: React.FC = () => {
    const [ip, setIp] = useState("");
    const [contentJson, setContentJson] = useState("");
    const [content, setContent] = useState("\n".repeat(15));
    const [language, setLanguage] = useState("json");

    const onClick = () => {
        fetchGeo(ip).then((res) => {
            const formated_json = format_code(res, "json");
            setContentJson(formated_json);
            const formated = convert(formated_json, undefined, language);
            setContent(formated);
        });
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
                    <MonacoEditor
                        key={language}
                        language={language}
                        height={400}
                        theme="github-light"
                        value={content}
                        options={{
                            selectOnLineNumbers: true,
                        }}
                        onMount={createHighlighterOnMount(language)}
                        onChange={onChange}
                    />
                </Row>
            </Space>
        </div>
    );
};

export default Index;
