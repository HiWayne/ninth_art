import { RouteType } from "./index";
import Layout from "pages/Layout";
import GamesCollect from "@/pages/GamesCollect";
import { lazy } from "react";

const FuziGame = lazy(() => import("@/pages/FuziGame/index"));
const ZhaoBuTong = lazy(() => import("@/pages/ZhaoBuTong/Game"));
const ZhaoBuTongLevels = lazy(() => import("@/pages/ZhaoBuTong/Levels"));
// const Restaurant = lazy(() => import("@/pages/Restaurant/index"));

const gameRoutes: RouteType[] = [
  {
    path: "/games",
    element: Layout,
    children: [
      {
        path: "/",
        element: GamesCollect,
        index: true,
      },
      {
        path: "fuzi",
        element: FuziGame,
      },
      {
        path: "zhaobutong",
        element: Layout,
        children: [
          {
            path: "levels",
            element: ZhaoBuTongLevels,
            index: true,
          },
          {
            path: "start",
            element: ZhaoBuTong,
          },
        ],
      },
      // {
      //   path: "restaurant",
      //   element: Restaurant,
      // },
    ],
  },
];

export default gameRoutes;
