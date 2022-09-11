import { Sprite } from "@inlet/react-pixi";
import { FenceWidth } from "../../constant";

export const Fence = ({
  x,
  y,
  width,
  height,
  image,
  rotation,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  image?: string;
  rotation?: number;
}) => {
  return rotation ? (
    <Sprite
      x={x}
      y={y}
      width={width || FenceWidth}
      height={height || FenceWidth}
      image={image}
      zIndex={9}
      rotation={rotation}
    />
  ) : (
    <Sprite
      x={x}
      y={y}
      width={width || FenceWidth}
      height={height || FenceWidth}
      image={image}
      zIndex={9}
    />
  );
};
