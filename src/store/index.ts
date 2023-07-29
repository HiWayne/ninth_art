import create from "zustand";
import { immer } from "zustand/middleware/immer";
import createFuziStore, { type FuziStore } from "./fuzi";
import createZhaoBuTongStore, { type ZhaoBuTongStore } from "./zhaoBuTong";
import createRestaurant, { type RestaurantStore } from "./restaurant";

interface Store {
  fuzi: FuziStore;
  zhaoBuTong: ZhaoBuTongStore;
  restaurant: RestaurantStore;
}

const useStore = create(
  immer<Store>((set) => ({
    fuzi: createFuziStore(set),
    zhaoBuTong: createZhaoBuTongStore(set),
    restaurant: createRestaurant(set),
  }))
);

export default useStore;
