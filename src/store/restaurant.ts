import { Game, Restaurant } from "@/pages/Restaurant/entity";

export const game = new Game();

const restaurant = game.getRestaurant();

export type TotalCountComputer = (totalCount: number) => number;

export interface RestaurantStore {
  restaurant: Restaurant;
  game: Game;
  isEditing: boolean;
  version: number;
  setRestaurant: (restaurant: Restaurant) => void;
  setGame: (game: Game) => void;
  setIsEditing: (status: boolean) => void;
  update: () => void;
}

const createRestaurant: (
  set: (
    nextStateOrUpdater: object | ((state: any) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => RestaurantStore = (set) => ({
  restaurant,
  game,
  isEditing: false,
  version: 0,
  setRestaurant(restaurant: Restaurant) {
    set((state) => {
      if (state.restaurant.restaurant === null) {
        state.restaurant.restaurant = restaurant;
      }
    });
  },
  setGame(game: Game) {
    set((state) => {
      if (state.restaurant.game === null) {
        state.restaurant.game = game;
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
