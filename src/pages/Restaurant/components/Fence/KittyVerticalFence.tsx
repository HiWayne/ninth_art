import { Fence } from "./Fence";
import kittyVerticalFenceImage from "../../assets/images/furnish/fence/kitty-vertical-fence.png";

export const KittyVerticalFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || kittyVerticalFenceImage} />;
};
