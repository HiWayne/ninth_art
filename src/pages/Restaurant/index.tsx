import { Container, Stage } from "@inlet/react-pixi";
import {
  MutableRefObject,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { GameTime, RestaurantContainer, RestaurantValue } from "./components";
import { Restaurant } from "./entity";
import { Game } from "./entity/Game";
import { createAnimate } from "@/shared/utils/index";

export const game = new Game();

const RestaurantGame = () => {
  const [s, updater] = useReducer((n) => n + 1, 0);
  const restaurantRef: MutableRefObject<Restaurant> = useRef(
    game.getRestaurant()
  );

  useEffect(() => {
    game.setUpdater(updater);
    game.play();
    const animate = createAnimate(() => {
      game.updateUI();
    });
    const stop = animate();

    return () => {
      stop();
    };
  }, []);

  const delta = useMemo(
    () => window.innerHeight / 2 - window.innerWidth / 2,
    []
  );

  return (
    <Stage
      width={window.innerHeight}
      height={window.innerWidth}
      options={{ backgroundColor: 0xfff8ec }}
      style={{
        transform: `rotate(90deg) translate(${delta}px, ${delta}px)`,
        transformOrigin: "center",
      }}
    >
      <Container width={window.innerHeight} height={window.innerWidth}>
        <RestaurantContainer />
        <GameTime x={10} y={0} time={game.getCurrentTimeInGame()} />
        <RestaurantValue
          x={0}
          y={20}
          cash={restaurantRef.current.getCash()}
          attractive={restaurantRef.current.attractive}
          impression={restaurantRef.current.getImpression()}
          safety={restaurantRef.current.safety}
          serviceLevel={restaurantRef.current.serviceLevel}
          cooking={restaurantRef.current.cooking}
        />
      </Container>
    </Stage>
  );
};

export default RestaurantGame;
