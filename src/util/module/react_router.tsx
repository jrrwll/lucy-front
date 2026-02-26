import { Navigate } from 'react-router-dom';
import React, { type ComponentType, type ReactNode, Suspense } from 'react';
import { renderRoutes, type RouteItem } from '@/util/module/router';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router'

function renderReactRoutes<T extends ComponentType>(
    routes: RouteItem<ComponentType<T>>[],
    currentPath: string
): ReactNode[] {
    const children = renderRoutes(routes, currentPath);
    const reactRoutes: ReactNode[] = [];
    children.forEach((item) => {
        if ('path' in item) {
            const { path, component } = item;
            const element = React.createElement(component as ComponentType);
            reactRoutes.push(<Route key={path} path={path} element={element}/>);
        } else {
            const { from, to } = item;
            reactRoutes.push(<Route key={from} path={from} element={<Navigate to={to}/>}/>);
        }
    });
    return reactRoutes;
}

export interface AppRouteProps {
    routes: RouteItem<React.ComponentType<ComponentType>>[];

    fallback?: ReactNode;
}

export function AppRoute({ routes, fallback }: AppRouteProps) {
    const children = renderReactRoutes(routes, '/');
    return (
        <BrowserRouter>
            {fallback && (
                <Suspense fallback={fallback}>
                    <Routes>{children}</Routes>
                </Suspense>
            )}
            {!fallback && <Routes>{children}</Routes>}
        </BrowserRouter>
    );
}

export function AppHashRoute({ routes, fallback }: AppRouteProps) {
    const children = renderReactRoutes(routes, '/');
    return (
        <HashRouter>
            {fallback && (
                <Suspense fallback={fallback}>
                    <Routes>{children}</Routes>
                </Suspense>
            )}
            {!fallback && <Routes>{children}</Routes>}
        </HashRouter>
    );
}
