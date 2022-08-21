import { Fence } from "./Fence";
import leftTopEnclosedFenceImage from "../../assets/images/furnish/left-top-fence.png";

export const LeftTopEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || leftTopEnclosedFenceImage} />;
};
