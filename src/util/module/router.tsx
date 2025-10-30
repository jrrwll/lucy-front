/*

/a, /e        -->    A
/a/b          -->    AB
/a/c/d        -->    ACD
/f, /g, /h    -->    F

const routes = [
    {
        path: '/a', childRoutes: [
            {path: '/b', components: AB},
            {
                path: "/c", childRoutes: [
                    {path: '/d', components: ACD},
                ],
            },
        ], components: A, redirect: "/e"
    },
    {path: '/f', components: F, redirect: ["/g", "/h"]},

];
*/
export interface RouteItem<T> {
    path: string;
    component?: T;
    redirect?: string | string[];
    children?: RouteItem<T>[];
}

export interface PathRoute<T> {
    path: string;
    component: T;
}

export interface FromToRoute {
    from: string;
    to: string;
}

function renderRoute<T>(
    item: RouteItem<T>,
    currentPath: string,
    children: (PathRoute<T> | FromToRoute)[]
) {
    let path = `${currentPath}/${item.path}`;
    // replace [/]+ to /, such as /// to /
    path = path.replace(/\/+/g, '/');

    if (item.component) {
        children.push({ path, component: item.component });
    }
    if (item.children) {
        item.children.forEach((r) => renderRoute(r, path, children));
    }
    if (item.redirect) {
        const { redirect } = item;
        if (typeof redirect === 'string') {
            children.push({ from: redirect, to: path });
        } else if (redirect) {
            redirect.forEach((it) => {
                children.push({ from: it, to: path });
            });
        }
    }
}

export function renderRoutes<T>(
    routeItems: RouteItem<T>[],
    currentPath: string
): (PathRoute<T> | FromToRoute)[] {
    const children: (PathRoute<T> | FromToRoute)[] = [];
    routeItems.forEach((item) => renderRoute(item, currentPath, children));
    return children;
}
