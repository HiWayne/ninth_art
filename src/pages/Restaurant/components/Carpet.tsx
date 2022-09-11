import { Container, Sprite } from "@inlet/react-pixi";
import { useMemo } from "react";
import { FenceWidth } from "../constant";

export const Carpet = ({
  x,
  y,
  rows,
  columns,
  image,
}: {
  x: number;
  y: number;
  rows: number;
  columns: number;
  image: string;
}) => {
  const carpetReactElements: JSX.Element[] = useMemo(() => {
    return new Array(rows).fill(true).reduce((children, _, row) => {
      new Array(columns).fill(true).forEach((_, column) => {
        children.push(
          <Sprite
            x={row * FenceWidth}
            y={column * FenceWidth}
            image={image}
            key={`${row}-${column}`}
          />
        );
      });
      return children;
    }, [] as JSX.Element[]);
  }, [rows, columns, image]);

  return (
    <Container x={x} y={y}>
      {carpetReactElements}
    </Container>
  );
};
