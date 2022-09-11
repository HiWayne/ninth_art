import useStore from "@/store";
import { useMemo } from "react";
import { computeHorizontalYellowFence } from "../components/RestaurantFence";

/**
 * @description 可变水平黄墙壁 HorizontalFence 数量
 * @returns [width1: number, width2: number]
 */
export const useMutableHorizontalFenceCount = () => {
  const decorations = useStore(
    (state) => state.restaurant.restaurant!.decorations
  );
  return useMemo(() => {
    return computeHorizontalYellowFence(decorations);
  }, []);
};
