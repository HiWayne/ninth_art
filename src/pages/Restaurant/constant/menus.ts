import { Menu } from "../entity/thing/Menu";
import { egg, qinCai, xiHongShi } from "./foodMaterials";

export const menu1_chaoQinCai = (cooking: number) =>
  new Menu(1, "炒青菜", 10, [{ foodMaterial: qinCai, cost: 1 }], 1, cooking, 3);
menu1_chaoQinCai._difficulty = 1;

export const menu2_xiHongShiChaoDan = (cooking: number) =>
  new Menu(
    1,
    "西红柿炒蛋",
    15,
    [
      { foodMaterial: xiHongShi, cost: 1 },
      { foodMaterial: egg, cost: 1 },
    ],
    5,
    cooking,
    5
  );
menu2_xiHongShiChaoDan._difficulty = 5;

export const menus = [menu1_chaoQinCai, menu2_xiHongShiChaoDan];
