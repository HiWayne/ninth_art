import { Fence } from "./Fence";
import fullyEnclosedFenceImage from "../../assets/images/furnish/fence/fully-fence.png";

export const FullyEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || fullyEnclosedFenceImage} />;
};
