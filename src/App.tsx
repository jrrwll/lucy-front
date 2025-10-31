import React, { type ComponentType, lazy } from "react";
import { AppHashRoute } from "@/util/module/react_router";
import { type RouteItem } from '@/util/module/router';

const Code = lazy(() => import('@/page/Code'));
const Ip = lazy(() => import('@/page/Ip'));

const routes: RouteItem<React.ComponentType<ComponentType>>[] = [
    { path: '/code', component: Code },
    // todo use localStorage to save customer favor tools
    { path: '/ip', component: Ip, redirect: "/" },
];

const Index: React.FC = () => {
    return (
        <AppHashRoute routes={routes} fallback={<div>Loading Page...</div>} />
    );
}

export default Index;
