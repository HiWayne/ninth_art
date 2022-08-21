import { Container, ParticleContainer } from "@inlet/react-pixi";
import { FenceWidth } from "../../constant";
import { BottomEnclosedFence } from "./BottomEnclosedFence";
import { GlassGap } from "./GlassGap";
import { HorizontalFence } from "./HorizontalFence";
import { KittyEnclosedFence } from "./KittyFence";
import { LeftTopEnclosedFence } from "./LeftTopEnclosedFence";
import { RightEnclosedFence } from "./RightEnclosedFence";
import { TopEnclosedFence } from "./TopEnclosedFence";
import { VerticalFence } from "./VerticalFence";

const repeat = (count: number) => new Array(count).fill(1);

export const RestaurantFence = () => {
  return (
    <Container position={[0, 0]}>
      {/* 最左侧第一竖直黄墙壁 */}
      <LeftTopEnclosedFence x={0} y={0} />
      {repeat(4).map((_, index) => (
        <VerticalFence x={0} y={FenceWidth * (index + 1)} key={index} />
      ))}
      <BottomEnclosedFence x={0} y={FenceWidth * 5} />

      {/* 最左侧水平黄墙壁 */}
      {repeat(7).map((_, index) => (
        <HorizontalFence x={FenceWidth * (index + 1)} y={0} key={index} />
      ))}
      <RightEnclosedFence x={FenceWidth * 8} y={0} />

      {/* 最左侧第一竖直猫咪墙 */}
      {repeat(2).map((_, index) => (
        <KittyEnclosedFence x={0} y={FenceWidth * (6 + index)} key={index} />
      ))}
      {/* 猫咪墙玻璃间隙 */}
      {repeat(2).map((_, index) => (
        <GlassGap
          x={FenceWidth / 2 - 2.5 / 2}
          y={FenceWidth * (6 + index)}
          key={index}
        />
      ))}

      {/* 最左侧第二竖直黄墙壁 */}
      <TopEnclosedFence x={0} y={FenceWidth * 8} />
      {repeat(2).map((_, index) => (
        <VerticalFence x={0} y={FenceWidth * (9 + index)} key={index} />
      ))}
      <BottomEnclosedFence x={0} y={FenceWidth * 11} />

      {/* 最左侧第二竖直猫咪墙 */}
      {repeat(2).map((_, index) => (
        <KittyEnclosedFence x={0} y={FenceWidth * (12 + index)} key={index} />
      ))}
      {/* 猫咪墙玻璃间隙 */}
      {repeat(2).map((_, index) => (
        <GlassGap
          x={FenceWidth / 2 - 2.5 / 2}
          y={FenceWidth * (12 + index)}
          key={index}
        />
      ))}

      {/* 最左侧第三竖直黄墙壁 */}
      <TopEnclosedFence x={0} y={FenceWidth * 14} />
      <VerticalFence x={0} y={FenceWidth * 15} />
      <BottomEnclosedFence x={0} y={FenceWidth * 16} />

      {/* 最左侧第三竖直猫咪墙 */}
      {repeat(3).map((_, index) => (
        <KittyEnclosedFence x={0} y={FenceWidth * (17 + index)} key={index} />
      ))}
    </Container>
  );
};
