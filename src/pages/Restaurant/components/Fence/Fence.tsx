import { Sprite } from "@inlet/react-pixi";

export const Fence = ({
  x,
  y,
  width,
  height,
  image,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  image?: string;
}) => {
  console.log(image);

  return (
    <Sprite
      x={x}
      y={y}
      width={width || 20}
      height={height || 20}
      image={image}
    />
  );
};
