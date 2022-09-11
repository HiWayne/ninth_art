import { Fence } from "./Fence";
import kittyEndFenceImage from "../../assets/images/furnish/fence/kitty-end-fence.png";

export const KittyEndFence = ({
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
  return (
    <Fence
      x={x}
      y={y}
      image={image || kittyEndFenceImage}
      rotation={rotation}
    />
  );
};
