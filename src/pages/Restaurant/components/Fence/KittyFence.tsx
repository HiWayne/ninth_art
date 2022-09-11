import { Fence } from "./Fence";
import kittyFenceImage from "../../assets/images/furnish/fence/kitty-fence.png";

export const KittyFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || kittyFenceImage} />;
};
