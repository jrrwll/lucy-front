import { Navigate, Route } from 'react-router-dom';
import React, { type ComponentType, type ReactNode } from 'react';
import { renderRoutes, type RouteItem } from '@/util/module/router';
import { BrowserRouter, HashRouter, Routes } from 'react-router'

function renderReactRoutes<T extends ReactNode>(
    routes: RouteItem<ComponentType<T>>[],
    currentPath: string
): ReactNode[] {
    const children = renderRoutes(routes, currentPath);
    const reactRoutes: ReactNode[] = [];
    children.forEach((item) => {
        if ('path' in item) {
            const { path, component } = item;
            const element = React.createElement(component as ComponentType);
            reactRoutes.push(<Route key={path} path={path} element={element} />);
        } else {
            const { from, to } = item;
            reactRoutes.push(<Route key={from} path={from} element={<Navigate to={to} />} />);
        }
    });
    return reactRoutes;
}

export interface AppRouteProps {
    routes: RouteItem<React.ComponentType<ReactNode>>[];
}

export function AppRoute({ routes }: AppRouteProps) {
    const children = renderReactRoutes(routes, '/');
    return (
        <BrowserRouter>
            <Routes>{children}</Routes>
        </BrowserRouter>
    );
}

export function AppHashRoute({ routes }: AppRouteProps) {
    const children = renderReactRoutes(routes, '/');
    return (
        <HashRouter>
            <Routes>{children}</Routes>
        </HashRouter>
    );
}
