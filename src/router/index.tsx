import { FC, ReactNode } from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import homeRoutes from "./home";
import gamesRoutes from "./games";
import toolsRoutes from "./tools";

export interface RouteType {
  path?: string;
  element: FC<any>;
  index?: boolean;
  children?: RouteType[];
}

// 路由列表
export const routes: RouteType[] = [
  ...homeRoutes,
  ...gamesRoutes,
  ...toolsRoutes,
];

const renderNestRoute = (routes: RouteType[]) => {
  return routes.map((route) => {
    const { path, children, index, element: Element } = route;
    return index ? (
      // @ts-ignore
      <Route key={"/"} index element={<Element />}>
        {Array.isArray(children) ? renderNestRoute(children) : null}
      </Route>
    ) : (
      <Route path={path} key={path} element={<Element />}>
        {Array.isArray(children) ? renderNestRoute(children) : null}
      </Route>
    );
  });
};

export const AppRoutes: FC<{ routes: RouteType[] }> = ({ routes }) => {
  return <BrowserRoutes>{renderNestRoute(routes)}</BrowserRoutes>;
};

const AppRouter: FC<{ children: ReactNode }> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppRouter;
