import { Fence } from "./Fence";
import horizontalFenceImage from "../../assets/images/furnish/horizontal-fence.png";

export const HorizontalFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || horizontalFenceImage} />;
};
