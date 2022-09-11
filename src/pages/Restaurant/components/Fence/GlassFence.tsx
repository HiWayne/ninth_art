import { Sprite } from "@inlet/react-pixi";
import glassFenceImage from "../../assets/images/furnish/fence/glass-fence.png";
import { FenceWidth } from "../../constant";

export const GlassFence = ({
  x,
  y,
  image,
  rotation,
}: {
  x: number;
  y: number;
  image?: string;
  rotation?: number;
}) => {
  return rotation ? (
    <Sprite
      x={x}
      y={y}
      width={FenceWidth}
      height={FenceWidth * 3}
      image={image || glassFenceImage}
      rotation={rotation}
    />
  ) : (
    <Sprite
      x={x}
      y={y}
      width={FenceWidth}
      height={FenceWidth * 3}
      image={image || glassFenceImage}
    />
  );
};
