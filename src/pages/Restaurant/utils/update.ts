import useStore from "@/store";

export const update = () => {
  return useStore.getState().restaurant.update();
};
