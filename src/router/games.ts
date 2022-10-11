import { RouteType } from "./index";
import Layout from "pages/Layout";
import GamesCollect from "@/pages/GamesCollect";
import { lazy } from "react";

const FuziGame = lazy(() => import("@/pages/FuziGame/index"));
const Restaurant = lazy(() => import("@/pages/Restaurant/index"));

const gameRoutes: RouteType[] = [
  {
    path: "/game",
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
        path: "restaurant",
        element: Restaurant,
      },
    ],
  },
];

export default gameRoutes;
