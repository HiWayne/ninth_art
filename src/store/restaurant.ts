import { Restaurant } from "@/pages/Restaurant/entity";

export type TotalCountComputer = (totalCount: number) => number;

export interface RestaurantStore {
  restaurant: Restaurant | null;
  isEditing: boolean;
  version: number;
  setRestaurant: (restaurant: Restaurant) => void;
  setIsEditing: (status: boolean) => void;
  update: () => void;
}

const createRestaurant: (
  set: (
    nextStateOrUpdater: object | ((state: any) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => RestaurantStore = (set) => ({
  restaurant: null,
  isEditing: false,
  version: 0,
  setRestaurant(restaurant: Restaurant) {
    set((state) => {
      if (state.restaurant.restaurant === null) {
        state.restaurant.restaurant = restaurant;
      }
    });
  },
  setIsEditing(status: boolean) {
    set((state) => {
      state.restaurant.isEditing = status;
    });
  },
  update() {
    set((state) => {
      state.restaurant.version++;
    });
  },
});

export default createRestaurant;
