import { RouteType } from "./index";
// import Home from "pages/Home";
import GamesCollect from "@/pages/GamesCollect";

const homeRoutes: RouteType[] = [
  {
    path: "/",
    element: GamesCollect,
  },
];

export default homeRoutes;
