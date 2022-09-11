import { useMemo } from "react";
import { FenceWidth } from "../constant";
import { useMutableHorizontalFenceCount } from "./useMutableHorizontalFenceCount";
import { useMutableVerticalFenceCount } from "./useMutableVerticalFenceCount";

/**
 * @description 计算餐厅在屏幕中的居中起始位置
 * @returns [number, number]
 */
export const useRestaurantPosition = (): [number, number] => {
  // 可变水平黄墙壁 HorizontalFence 数量
  const [width1, width2] = useMutableHorizontalFenceCount();

  // 可变竖直黄墙壁 VerticalFence 数量
  const [height1, height2, height3] = useMutableVerticalFenceCount();

  return useMemo(
    () => [
      (window.innerHeight - (width1 + width2 + 16) * FenceWidth) / 2,
      (window.innerWidth - (height1 + height2 + height3 + 19) * FenceWidth) / 2,
    ],
    []
  );
};
