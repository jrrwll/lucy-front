import React, { type ComponentType, lazy } from "react";
import { AppHashRoute } from "@/util/module/react_router";
import { type RouteItem } from '@/util/module/router';
import ToolPage from "@/component/ToolPage";

const Code = lazy(() => import('@/page/Code'));
const Ip = lazy(() => import('@/page/Ip'));
const Unit = lazy(() => import('@/page/Unit'));
const QrCode = lazy(() => import('@/page/QrCode'));

const routes: RouteItem<React.ComponentType<ComponentType>>[] = [
    { path: '/code', component: () => <ToolPage><Code/></ToolPage> },
    // todo use localStorage to save customer favor tools
    { path: '/ip', component: () => <ToolPage><Ip/></ToolPage>, redirect: "/" },
    { path: '/unit', component: () => <ToolPage><Unit/></ToolPage> },
    { path: '/qrcode', component: () => <ToolPage><QrCode/></ToolPage> },
];

const Index: React.FC = () => {
    return (
        <AppHashRoute routes={routes} fallback={<div>Loading Page...</div>} />
    );
}

export default Index;
