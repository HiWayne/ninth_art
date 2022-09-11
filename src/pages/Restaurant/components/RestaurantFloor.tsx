import useStore from "@/store";
import { useMemo } from "react";
import { FenceWidth } from "../constant";
import { hasBar2 } from "./RestaurantFence";
import { Floor } from "./Floor";
import yellowWoodenFloorImage from "../assets/images/furnish/floor/yellow-wooden-floor.png";
import grayFloorImage from "../assets/images/furnish/floor/gray-floor.png";
import greenFloorImage from "../assets/images/furnish/floor/green-floor.png";
import { Container } from "@inlet/react-pixi";
import {
  useMutableHorizontalFenceCount,
  useMutableVerticalFenceCount,
  useRestaurantPosition,
} from "../hooks";

export const RestaurantFloor = () => {
  // 最终形态：从最左侧看，diningAreaSize一列9个，kitchenSize一列6个 一行8个
  // 初始形态：diningAreaSize-42，kitchenSize-4
  // diningAreaSize升级顺序：42、72，后续每次+36
  // kitchenSize升级顺序：6-12-18-24-48
  const decorations = useStore(
    (state) => state.restaurant.restaurant!.decorations
  );

  const position = useRestaurantPosition();

  // 水平黄墙壁 HorizontalFence 数量
  const [width1, width2] = useMutableHorizontalFenceCount();

  // 竖直黄墙壁 VerticalFence 数量
  const [height1, height2, height3] = useMutableVerticalFenceCount();

  const diningAreaRows = useMemo(() => {
    return 18;
  }, []);

  const diningAreaColumns = useMemo(() => {
    return width1 + width2 + 3 + (hasBar2(decorations) ? 6 : 0);
  }, [width1, width2, decorations]);

  const kitchenRows = useMemo(() => {
    return 6;
  }, []);

  const kitchenColumns = useMemo(() => {
    return 8;
  }, []);

  return (
    <Container position={position} sortableChildren={true}>
      {/* 顾客活动区域 */}
      <Floor
        x={FenceWidth}
        y={FenceWidth * 4}
        rows={diningAreaRows}
        columns={diningAreaColumns}
        image={yellowWoodenFloorImage}
        zIndex={-9}
      />
      {/* 厨房区域 */}
      <Floor
        x={FenceWidth}
        y={FenceWidth * (10 + height1 + height2 + height3)}
        rows={kitchenRows}
        columns={kitchenColumns}
        image={grayFloorImage}
        zIndex={-8}
      />
      {/* 门口区域 */}
      <Floor
        x={FenceWidth * (width1 + width2 + 3 + (hasBar2(decorations) ? 6 : 0))}
        y={FenceWidth * 6}
        rows={height1 + height2 + height3 + 7}
        columns={6}
        image={greenFloorImage}
        zIndex={-8}
      />
    </Container>
  );
};
