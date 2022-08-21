import { Fence } from "./Fence";
import kittyFenceImage from "../../assets/images/furnish/kitty-fence.png";

export const KittyEnclosedFence = ({
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
