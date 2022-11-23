import { useEffect } from "react";
import { Stage } from "@inlet/react-pixi";
import useStore from "@/store";
import {
  GameTime,
  GameMain,
  RestaurantValue,
  Viewport,
  Menu,
} from "./components";

const RestaurantGame = () => {
  const game = useStore((state) => state.restaurant.game);
  const update = useStore((state) => state.restaurant.update);

  useEffect(() => {
    game.setUpdater(update);
    game.play();

    return () => {
      game.pause();
    };
  }, []);

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0xfff8ec }}
      >
        <Viewport width={window.innerWidth} height={window.innerHeight}>
          <GameMain />
        </Viewport>
        <GameTime x={5} y={0} />
        <RestaurantValue x={5} y={0} position={[0, 0]} />
      </Stage>
      <Menu />
    </div>
  );
};

export default RestaurantGame;
