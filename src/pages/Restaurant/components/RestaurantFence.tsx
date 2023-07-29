import { isArray } from "@/shared/utils";
import useStore from "@/store";
import { Container } from "@inlet/react-pixi";
import { useMemo } from "react";
import shallow from "zustand/shallow";
import { FenceWidth } from "../constant";
import { Thing } from "../entity/thing";
import {
  useMutableHorizontalFenceCount,
  useMutableVerticalFenceCount,
  useRestaurantPosition,
} from "../hooks";
import { RightBottomEnclosedFence } from "./Fence";
import { BottomEnclosedFence } from "./Fence/BottomEnclosedFence";
import { FullyEnclosedFence } from "./Fence/FullyEnclosedFence";
import { GlassFence } from "./Fence/GlassFence";
import { GlassGap } from "./Fence/GlassGap";
import { HorizontalFence } from "./Fence/HorizontalFence";
import { KittyEndFence } from "./Fence/KittyEndFence";
import { KittyFence } from "./Fence/KittyFence";
import { KittyVerticalFence } from "./Fence/KittyVerticalFence";
import { LeftEnclosedFence } from "./Fence/LeftEnclosedFence";
import { LeftTopEnclosedFence } from "./Fence/LeftTopEnclosedFence";
import { RightEnclosedFence } from "./Fence/RightEnclosedFence";
import { RightTopEnclosedFence } from "./Fence/RightTopEnclosedFence";
import { TopEnclosedFence } from "./Fence/TopEnclosedFence";
import { VerticalFence } from "./Fence/VerticalFence";

const repeat = (count: number) => new Array(count).fill(1);

// 是否有吧台1
export const hasBar1 = (decorations: Thing[]) =>
  isArray(decorations)
    ? decorations.some((decoration) => decoration.name === "BAR1")
    : false;

// 是否有吧台2
export const hasBar2 = (decorations: Thing[]) =>
  isArray(decorations)
    ? decorations.some((decoration) => decoration.name === "BAR2")
    : false;

// 是否有吧台3
export const hasBar3 = (decorations: Thing[]) =>
  isArray(decorations)
    ? decorations.some((decoration) => decoration.name === "BAR3")
    : false;

export const hasAnyBar = (decorations: Thing[]) =>
  isArray(decorations)
    ? decorations.some(
        (decoration) =>
          decoration.name === "BAR1" ||
          decoration.name === "BAR2" ||
          decoration.name === "BAR3"
      )
    : false;

export const computeHorizontalYellowFence = (decorations: Thing[]) => {
  if (hasBar2(decorations)) {
    return [7, 11];
  } else {
    return [12, 11];
  }
};

export const computeVerticalYellowFence = () => {
  return [3, 2, 1];
};

/**
 * @description 餐厅长34，宽22
 * @returns 餐厅墙壁
 */
export const RestaurantFence = () => {
  // 最终形态：从最左侧看，diningAreaSize一列9个，kitchenSize一列6个
  // 初始形态：diningAreaSize-42，kitchenSize-4
  // diningAreaSize升级顺序：42、72，后续每次+36
  // kitchenSize升级顺序：6-12-18-24-48
  const [decorations] = useStore(
    (state) => [state.restaurant.restaurant!.decorations],
    shallow
  );

  const position = useRestaurantPosition();

  // 水平黄墙壁 HorizontalFence 数量
  const [width1, width2] = useMutableHorizontalFenceCount();

  // 竖直黄墙壁 VerticalFence 数量
  const [height1, height2, height3] = useMutableVerticalFenceCount();

  const kitchenRows = useMemo(() => {
    return 6;
  }, []);

  const kitchenColumns = useMemo(() => {
    return 8;
  }, []);

  return (
    <Container position={position} sortableChildren={true}>
      {/* 最左侧第一竖直黄墙壁 */}
      <LeftTopEnclosedFence x={0} y={FenceWidth * 3} />
      {repeat(height1).map((_, index) => (
        <VerticalFence
          x={0}
          y={FenceWidth * 3 + FenceWidth * (index + 1)}
          key={index}
        />
      ))}
      <BottomEnclosedFence
        x={0}
        y={FenceWidth * 3 + FenceWidth * (height1 + 1)}
      />

      {/* 最左侧水平黄墙壁 */}
      {repeat(width1).map((_, index) => (
        <HorizontalFence
          x={FenceWidth * (index + 1)}
          y={FenceWidth * 3}
          key={index}
        />
      ))}
      <RightEnclosedFence x={FenceWidth * (width1 + 1)} y={FenceWidth * 3} />

      {/* 最左侧第一竖直猫咪墙 */}
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={0}
          y={FenceWidth * 3 + FenceWidth * (index + (height1 + 2))}
          key={index}
        />
      ))}
      {/* 猫咪墙玻璃间隙 */}
      {repeat(2).map((_, index) => (
        <GlassGap
          x={FenceWidth / 2 - 2.5 / 2}
          y={FenceWidth * 3 + FenceWidth * (index + (height1 + 2))}
          key={index}
        />
      ))}

      {/* 最左侧第二竖直黄墙壁 */}
      <TopEnclosedFence x={0} y={FenceWidth * 3 + FenceWidth * (height1 + 4)} />
      {repeat(height2).map((_, index) => (
        <VerticalFence
          x={0}
          y={FenceWidth * 3 + FenceWidth * (index + (height1 + 5))}
          key={index}
        />
      ))}
      <BottomEnclosedFence
        x={0}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + 5)}
      />

      {/* 最左侧第二竖直猫咪墙 */}
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={0}
          y={FenceWidth * 3 + FenceWidth * (index + (height1 + height2 + 6))}
          key={index}
        />
      ))}
      {/* 猫咪墙玻璃间隙 */}
      {repeat(2).map((_, index) => (
        <GlassGap
          x={FenceWidth / 2 - 2.5 / 2}
          y={FenceWidth * 3 + FenceWidth * (index + (height1 + height2 + 6))}
          key={index}
        />
      ))}

      {/* 最左侧第三竖直黄墙壁 */}
      <TopEnclosedFence
        x={0}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + 8)}
      />
      {repeat(height3).map((_, index) => (
        <VerticalFence
          x={0}
          y={FenceWidth * 3 + FenceWidth * (height1 + height2 + 9)}
          key={index}
        />
      ))}
      <BottomEnclosedFence
        x={0}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 9)}
      />

      {/* 最左侧第三竖直猫咪墙 */}
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={0}
          y={
            FenceWidth * 3 +
            FenceWidth * (index + (height1 + height2 + height3 + 10))
          }
          key={index}
        />
      ))}
      <KittyEndFence
        x={0}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 12)}
      />

      {/* 中上凸墙 */}
      {hasBar2(decorations) ? (
        <>
          <LeftTopEnclosedFence x={FenceWidth * (width1 + 2)} y={0} />
          <BottomEnclosedFence x={FenceWidth * (width1 + 2)} y={FenceWidth} />
          {repeat(2).map((_, index) => (
            <KittyVerticalFence
              x={FenceWidth * (width1 + 2)}
              y={FenceWidth * (index + 2)}
              key={index}
            />
          ))}
          <KittyEndFence x={FenceWidth * (width1 + 2)} y={FenceWidth * 4} />
          {repeat(3).map((_, index) => (
            <HorizontalFence
              x={FenceWidth * (index + (width1 + 3))}
              y={0}
              key={index}
            />
          ))}
          <RightTopEnclosedFence x={FenceWidth * (width1 + 6)} y={0} />
          <BottomEnclosedFence x={FenceWidth * (width1 + 6)} y={FenceWidth} />
          {repeat(2).map((_, index) => (
            <KittyVerticalFence
              x={FenceWidth * (width1 + 6)}
              y={FenceWidth * (index + 2)}
              key={index}
            />
          ))}
          <KittyEndFence x={FenceWidth * (width1 + 6)} y={FenceWidth * 4} />
          {repeat(3).map((_, index) => (
            <KittyFence
              x={FenceWidth * (index + (width1 + 3))}
              y={FenceWidth}
              key={index}
            />
          ))}
          {repeat(3).map((_, index) => (
            <KittyFence
              x={FenceWidth * (index + (width1 + 3))}
              y={FenceWidth * 2}
              key={index}
            />
          ))}
          {repeat(3).map((_, index) => (
            <KittyEndFence
              x={FenceWidth * (index + (width1 + 3))}
              y={FenceWidth * 3}
              key={index}
            />
          ))}
        </>
      ) : null}

      {/* 上中水平长黄墙壁 */}
      <LeftEnclosedFence x={FenceWidth * (width1 + 2)} y={FenceWidth * 3} />
      {repeat(width2).map((_, index) => (
        <HorizontalFence
          x={FenceWidth * (index + (width1 + 3))}
          y={FenceWidth * 3}
          key={index}
        />
      ))}
      <RightTopEnclosedFence
        x={FenceWidth * (width1 + width2 + 3)}
        y={FenceWidth * 3}
      />
      <BottomEnclosedFence
        x={FenceWidth * (width1 + width2 + 3)}
        y={FenceWidth * 4}
      />
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={FenceWidth * (width1 + width2 + 3)}
          y={FenceWidth * (index + 5)}
          key={index}
        />
      ))}
      <KittyEndFence
        x={FenceWidth * (width1 + width2 + 3)}
        y={FenceWidth * 7}
      />

      {/* 上方玻璃墙 */}
      {repeat(5).map((_, index) => (
        <GlassFence
          x={FenceWidth * (index + (width1 + width2 + 4))}
          y={FenceWidth * 3.5}
          key={index}
        />
      ))}

      {/* 上方大门 */}
      <FullyEnclosedFence
        x={FenceWidth * (width1 + width2 + 9)}
        y={FenceWidth * 3}
      />
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={FenceWidth * (width1 + width2 + 9)}
          y={FenceWidth * (4 + index)}
          key={index}
        />
      ))}
      <KittyEndFence
        x={FenceWidth * (width1 + width2 + 9)}
        y={FenceWidth * 6}
      />

      {/* 厨房右侧竖直墙壁 */}
      <KittyEndFence
        x={FenceWidth * (kitchenColumns + 1)}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 12)}
      />
      {repeat(2).map((_, index) => (
        <KittyFence
          x={FenceWidth * (kitchenColumns + 1)}
          y={
            FenceWidth * 3 +
            FenceWidth * (height1 + height2 + height3 + 12 - (index + 1))
          }
          key={index}
        />
      ))}
      <BottomEnclosedFence
        x={FenceWidth * (kitchenColumns + 1)}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 10)}
      />
      {repeat(4).map((_, index) => (
        <HorizontalFence
          x={FenceWidth * (kitchenColumns + 1)}
          y={
            FenceWidth * 3 +
            FenceWidth * (height1 + height2 + height3 + 10 - (index + 1))
          }
          key={index}
        />
      ))}
      <TopEnclosedFence
        x={FenceWidth * (kitchenColumns + 1)}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 7)}
      />

      {/* 下方水平黄墙壁 */}
      {repeat(width1 + width2 + 1 - kitchenColumns).map((_, index) => (
        <HorizontalFence
          x={FenceWidth * (kitchenColumns + 2 + index)}
          y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 12)}
          key={index}
        />
      ))}
      <RightBottomEnclosedFence
        x={
          FenceWidth *
          (kitchenColumns + 2 + width1 + width2 + 1 - kitchenColumns)
        }
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 12)}
      />
      <TopEnclosedFence
        x={
          FenceWidth *
          (kitchenColumns + 2 + width1 + width2 + 1 - kitchenColumns)
        }
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 11)}
      />
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={
            FenceWidth *
            (kitchenColumns + 2 + width1 + width2 + 1 - kitchenColumns)
          }
          y={
            FenceWidth * 3 +
            FenceWidth * (height1 + height2 + height3 + 10 - index)
          }
          key={index}
        />
      ))}
      <KittyEndFence
        x={FenceWidth * (width1 + width2 + 4)}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 8 + 1)}
        rotation={Math.PI}
      />

      {/* 下方玻璃墙 */}
      {repeat(5).map((_, index) => (
        <GlassFence
          x={FenceWidth * (index + (width1 + width2 + 5))}
          y={FenceWidth * (height1 + height2 + height3 + 15.5)}
          key={index}
          rotation={Math.PI}
        />
      ))}

      {/* 下方大门 */}
      <FullyEnclosedFence
        x={FenceWidth * (width1 + width2 + 9)}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 12)}
      />
      {repeat(2).map((_, index) => (
        <KittyVerticalFence
          x={FenceWidth * (width1 + width2 + 9)}
          y={
            FenceWidth * 3 +
            FenceWidth * (height1 + height2 + height3 + 11 - index)
          }
          key={index}
        />
      ))}
      <KittyEndFence
        x={FenceWidth * (width1 + width2 + 10)}
        y={FenceWidth * 3 + FenceWidth * (height1 + height2 + height3 + 10)}
        rotation={Math.PI}
      />
    </Container>
  );
};
