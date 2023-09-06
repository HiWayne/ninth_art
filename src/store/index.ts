import create from "zustand";
import { immer } from "zustand/middleware/immer";
import createFuziStore, { type FuziStore } from "./fuzi";
import createZhaoBuTongStore, { type ZhaoBuTongStore } from "./zhaoBuTong";
import createRestaurant, { type RestaurantStore } from "./restaurant";
import { type FineDrawingStore, createFineDrawingStore } from "./fineDrawing";

interface Store {
  fuzi: FuziStore;
  zhaoBuTong: ZhaoBuTongStore;
  restaurant: RestaurantStore;
  fineDrawing: FineDrawingStore;
}

const useStore = create(
  immer<Store>((set) => {
    const createModel = (name: string, create: any) =>
      create((...params: any[]) =>
        set((state) => params[0]((state as any)[name]), ...params.slice(1))
      );
    const store: Store = {
      fuzi: createModel("fuzi", createFuziStore),
      zhaoBuTong: createModel("zhaoBuTong", createZhaoBuTongStore),
      restaurant: createModel("restaurant", createRestaurant),
      fineDrawing: createModel("fineDrawing", createFineDrawingStore),
    };
    return store;
  })
);

export default useStore;
