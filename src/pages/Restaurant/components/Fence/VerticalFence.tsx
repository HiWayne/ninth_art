import { Fence } from "./Fence";
import verticalFenceImage from "../../assets/images/furnish/vertical-fence.png";

export const VerticalFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || verticalFenceImage} />;
};
