import { RestaurantFence } from "./RestaurantFence";
import { RestaurantContainer } from "./RestaurantContainer";
import { RestaurantFloor } from "./RestaurantFloor";
import { StreetContainer } from "./StreetContainer";
import { RestaurantTableAndSeats } from "./RestaurantTableAndSeats";
import { RestaurantKitchen } from "./kitchen/index";
import { Customers } from "./Customers";

export const GameMain = () => {
  return (
    <>
      <RestaurantContainer position={[0, 0]} sortableChildren={true}>
        <RestaurantFloor />
        <RestaurantFence />
        <RestaurantTableAndSeats />
        <RestaurantKitchen />
      </RestaurantContainer>
      <Customers />
      {/* <StreetContainer></StreetContainer> */}
    </>
  );
};
