import { Sprite } from "@inlet/react-pixi";
import { FC } from "react";
import {
  KitchenUtensilHeight,
  KitchenUtensilWidth,
} from "../../constant";

interface KitchenUtensilProps {
  image: string;
  width?: number;
  height?: number;
  x: number;
  y: number;
}

export const KitchenUtensil: FC<KitchenUtensilProps> = ({
  image,
  x,
  y,
  width,
  height,
}) => (
  <Sprite
    width={width || KitchenUtensilWidth}
    height={height || KitchenUtensilHeight}
    x={x}
    y={y}
    image={image}
  />
);
