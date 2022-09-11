import { Fence } from "./Fence";
import leftEnclosedFenceImage from "../../assets/images/furnish/fence/left-fence.png";

export const LeftEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || leftEnclosedFenceImage} />;
};
