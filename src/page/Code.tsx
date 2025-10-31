import React, { useState } from "react";
import { Button, Col, Row, Select, Space } from "antd";
import CodeMirror from '@uiw/react-codemirror';
import { EXTENSIONS } from "@/thridparty/editor";
import { MINIFY_LANGS } from "@/config/constant";

import { format_code, minify_code } from "@/provider/code";

const { Option } = Select;

const Index: React.FC = () => {
    const [language, setLanguage] = useState("json");
    const [ident, setIdent] = useState("4");
    const [content, setContent] = useState("");

    const onClickFormat = async () => {
        const formated = await format_code(content, language, Number(ident));
        setContent(formated);
    };

    const onClickMinify = async () => {
        const formated = await minify_code(content, language);
        setContent(formated);
    };

    return (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Row gutter={8}>
                <Col offset={12} span={12}>
                    <Space>
                        <Select
                            defaultValue={language}
                            onChange={(value: string) => {
                                setLanguage(value);
                            }}
                        >
                            <Option value="css">CSS</Option>
                            <Option value="html">HTML</Option>
                            <Option value="java">Java</Option>
                            <Option value="javascript">JavaScript</Option>
                            <Option value="json">JSON</Option>
                            <Option value="less">LESS</Option>
                            <Option value="markdown">Markdown</Option>
                            <Option value="scss">SCSS</Option>
                            <Option value="sql">SQL</Option>
                            <Option value="toml">TOML</Option>
                            <Option value="typescript">TypeScript</Option>
                            <Option value="xml">XML</Option>
                            <Option value="yaml">YAML</Option>
                        </Select>
                        <Select
                            defaultValue={ident}
                            onChange={(value: string) => {
                                setIdent(value);
                            }}
                        >
                            <Option value="0">无缩进</Option>
                            <Option value="2">缩进空格2</Option>
                            <Option value="4">缩进空格4</Option>
                            <Option value="8">缩进空格8</Option>
                        </Select>
                        <Button type="primary" onClick={onClickFormat}>
                            格式化
                        </Button>
                        {MINIFY_LANGS.includes(language) && (
                            <Button type="primary" onClick={onClickMinify}>
                                压缩
                            </Button>
                        )}
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1}>
                    <CodeMirror
                        extensions={EXTENSIONS}
                        key={language}
                        value={content}
                        onChange={(v: string | undefined) => {
                            if (v !== undefined) setContent(v);
                        }}
                    />
                </Col>
            </Row>
        </Space>
    );
};

export default Index;
