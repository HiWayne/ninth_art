import useStore from "@/store";
import { Container } from "@inlet/react-pixi";
import { FenceWidth } from "../../constant";
import {
  useMutableVerticalFenceCount,
  useRestaurantPosition,
} from "../../hooks";
import { Cooker } from "../character/Cooker";
import { RestaurantKitchenFloor } from "./RestaurantKitchenFloor";
import { RestaurantKitchenUtensils } from "./RestaurantKitchenUtensils";

export const RestaurantKitchen = () => {
  const position = useRestaurantPosition();

  const cookers = useStore((state) => state.restaurant.restaurant?.cookers);

  // 竖直黄墙壁 VerticalFence 数量
  const [height1, height2, height3] = useMutableVerticalFenceCount();

  return (
    <Container
      position={[
        FenceWidth + position[0],
        FenceWidth * (10 + height1 + height2 + height3) + position[1],
      ]}
    >
      <RestaurantKitchenFloor />
      <RestaurantKitchenUtensils />
      {cookers
        ? cookers
            .slice(0, 4)
            .map((cooker, index) => (
              <Cooker key={index} x={32 * index} y={20} data={cooker} />
            ))
        : null}
      {cookers && cookers.length > 4
        ? cookers
            .slice(4)
            .map((cooker, index) => (
              <Cooker key={index} x={32 * index} y={20} data={cooker} />
            ))
        : null}
    </Container>
  );
};
