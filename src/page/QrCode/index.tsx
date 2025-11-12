import React, { useState } from "react";
import { Input } from "antd";

const Index: React.FC = () => {
    const [content, setContent] = useState("");

    return <Input value={content} onChange={(e) => setContent(e.target.value)}/>;
};

export default Index;
