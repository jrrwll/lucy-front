import React from "react";
import { Space } from "antd";
import Header from "./Header";

const Index: React.FC<{
    children: React.ReactNode,
}> = ({ children }) => {
    return (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Header/>
            {children}
        </Space>
    );
};

export default Index;
