import { Sprite } from "@inlet/react-pixi";
import glassGapImage from "../../assets/images/furnish/glass-gap.png";

export const GlassGap = ({ x, y }: { x: number; y: number }) => {
  return <Sprite x={x} y={y} width={2.5} height={20} image={glassGapImage} />;
};
