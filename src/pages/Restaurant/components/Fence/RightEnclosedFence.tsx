import { Fence } from "./Fence";
import rightEnclosedFenceImage from "../../assets/images/furnish/fence/right-fence.png";

export const RightEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || rightEnclosedFenceImage} />;
};
