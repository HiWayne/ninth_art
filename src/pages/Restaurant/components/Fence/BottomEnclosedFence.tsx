import { Fence } from "./Fence";
import bottomEnclosedFenceImage from '../../assets/images/furnish/bottom-fence.png'

export const BottomEnclosedFence = ({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image?: string;
  }) => {
    return <Fence x={x} y={y} image={image || bottomEnclosedFenceImage} />;
  };