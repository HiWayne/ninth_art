import { Fence } from "./Fence";
import topEnclosedFenceImage from "../../assets/images/furnish/top-fence.png";

export const TopEnclosedFence = ({
  x,
  y,
  image,
}: {
  x: number;
  y: number;
  image?: string;
}) => {
  return <Fence x={x} y={y} image={image || topEnclosedFenceImage} />;
};
