import { Container, Sprite } from "@inlet/react-pixi";
import { useMemo } from "react";
import { FenceWidth } from "../constant";

type Scenes =
  | "DINING"
  | "KITCHEN"
  | "REST"
  | "PLAY"
  | "CAT"
  | "BAR1"
  | "BAR2"
  | "GATE";

const imagesMap = {
  // 吃饭
  DINING: [],
  // 厨房
  KITCHEN: [],
  // 休息区
  REST: [],
  // 儿童玩耍区
  PLAY: [],
  // 猫咖
  CAT: [],
  // 吧台1
  BAR1: [],
  // 吧台2
  BAR2: [],
  GATE: [],
};

export const Floor = ({
  x,
  y,
  rows,
  columns,
  image,
  zIndex,
}: {
  x: number;
  y: number;
  rows: number;
  columns: number;
  image: string;
  zIndex: number;
}) => {
  const floorsReactElements: JSX.Element[] = useMemo(() => {
    return new Array(rows).fill(true).reduce((children, _, row) => {
      new Array(columns).fill(true).forEach((_, column) => {
        children.push(
          <Sprite
            x={column * FenceWidth}
            y={row * FenceWidth}
            width={FenceWidth}
            height={FenceWidth}
            image={image}
            key={`${row}-${column}`}
          />
        );
      });
      return children;
    }, [] as JSX.Element[]);
  }, [rows, columns, image]);

  return (
    <Container x={x} y={y} zIndex={zIndex}>
      {floorsReactElements}
    </Container>
  );
};
