import create from "zustand";
import { immer } from "zustand/middleware/immer";
import createFuziStore from "./fuzi";
import type { FuziStore } from "./fuzi";

interface Store {
  fuzi: FuziStore;
}

const useStore = create(
  immer<Store>((set) => ({
    fuzi: createFuziStore(set),
  }))
);

export default useStore;
