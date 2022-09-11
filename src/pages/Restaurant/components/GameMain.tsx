import { RestaurantFence } from "./RestaurantFence";
import { RestaurantContainer } from "./RestaurantContainer";
import { RestaurantFloor } from "./RestaurantFloor";
import { StreetContainer } from "./StreetContainer";
import { RestaurantTableAndSeats } from "./RestaurantTableAndSeats";

export const GameMain = () => {
  return (
    <>
      <RestaurantContainer position={[0, 0]} sortableChildren={true}>
        <RestaurantFloor />
        <RestaurantFence />
        <RestaurantTableAndSeats />
      </RestaurantContainer>

      <StreetContainer></StreetContainer>
    </>
  );
};
