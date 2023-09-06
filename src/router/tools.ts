import Layout from "@/pages/Layout";
import { RouteType } from "./index";
import { lazy } from "react";

const Canvas = lazy(() => import("@/pages/Canvas/index"));

const homeRoutes: RouteType[] = [
  {
    path: "/tools",
    element: Layout,
    children: [
      {
        path: "canvas",
        element: Canvas,
      },
    ],
  },
];

export default homeRoutes;
