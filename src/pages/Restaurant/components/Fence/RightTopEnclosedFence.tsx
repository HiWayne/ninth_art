import { Fence } from "./Fence";
import rightTopEnclosedFenceImage from "../../assets/images/furnish/right-top-fence.png";

export const RightTopEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || rightTopEnclosedFenceImage} />;
};
