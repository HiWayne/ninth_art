import create from "zustand";
import { immer } from "zustand/middleware/immer";
import createFuziStore from "./fuzi";
import type { FuziStore } from "./fuzi";
import createRestaurant from "./restaurant";
import type { RestaurantStore } from "./restaurant";

interface Store {
  fuzi: FuziStore;
  restaurant: RestaurantStore;
}

const useStore = create(
  immer<Store>((set) => ({
    fuzi: createFuziStore(set),
    restaurant: createRestaurant(set),
  }))
);

export default useStore;
