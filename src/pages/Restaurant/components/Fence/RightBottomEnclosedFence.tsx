import { Fence } from "./Fence";
import rightBottomEnclosedFenceImage from "../../assets/images/furnish/fence/right-bottom-fence.png";

export const RightBottomEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || rightBottomEnclosedFenceImage} />;
};
