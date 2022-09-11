import { Sprite } from "@inlet/react-pixi";
import glassGapImage from "../../assets/images/furnish/fence/glass-gap.png";
import { FenceWidth } from "../../constant";

export const GlassGap = ({ x, y }: { x: number; y: number }) => {
  return <Sprite x={x} y={y} width={FenceWidth * 0.125} height={FenceWidth} image={glassGapImage} />;
};
