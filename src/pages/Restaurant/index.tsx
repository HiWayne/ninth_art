import { useEffect } from "react";
import { Stage } from "@inlet/react-pixi";
import useStore from "@/store";
import { Game } from "./entity/Game";
import { GameTime, GameMain, RestaurantValue, Viewport } from "./components";

export const game = new Game();

const restaurant = game.getRestaurant();

useStore.getState().restaurant.setRestaurant(restaurant);

const RestaurantGame = () => {
  const update = useStore((state) => state.restaurant.update);

  useEffect(() => {
    game.setUpdater(update);
    game.play();

    return () => {
      game.pause();
    };
  }, []);

  return (
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
  );
};

export default RestaurantGame;
