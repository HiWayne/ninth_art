import { useMemo } from "react";
import { computeVerticalYellowFence } from "../components/RestaurantFence";

/**
 * @description 可变竖直黄墙壁 VerticalFence 数量
 * @returns [height1: number, height2: number, height3: number]
 */
export const useMutableVerticalFenceCount = () =>
  useMemo(() => {
    return computeVerticalYellowFence();
  }, []);
