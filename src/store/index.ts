import create from "zustand";
import { immer } from "zustand/middleware/immer";
import createFuziStore, { type FuziStore } from "./fuzi";
// import createRestaurant, { type RestaurantStore } from "./restaurant";
import createZhaoBuTongStore, { type ZhaoBuTongStore } from "./zhaoBuTong";

interface Store {
  fuzi: FuziStore;
  // restaurant: RestaurantStore;
  zhaoBuTong: ZhaoBuTongStore;
}

const useStore = create(
  immer<Store>((set) => ({
    fuzi: createFuziStore(set),
    // restaurant: createRestaurant(set),
    zhaoBuTong: createZhaoBuTongStore(set),
  }))
);

export default useStore;
