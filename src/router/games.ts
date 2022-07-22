import { RouteType } from "./index";
import Layout from "pages/Layout";
import FuziGame from "@/pages/FuziGame/index";
import GamesCollect from "@/pages/GamesCollect";

const editorRoutes: RouteType[] = [
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
    ],
  },
];

export default editorRoutes;
