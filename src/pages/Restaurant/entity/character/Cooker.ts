import { random } from "@/shared/utils";
import { Staff } from "./Staff";
import type { Menu } from "../thing/Menu";
import type { Skill } from "./Skill";
export class Cooker extends Staff {
  dishes: Menu[];
  dishLimit: number;
  constructor(
    x: number,
    y: number,
    gender: 0 | 1,
    name: string,
    salary: number,
    ability: number,
    skills: Skill<Staff | Cooker>[],
    energy: number,
    stability: number,
    status: number = 0,
    rarity: 1 | 2 | 3 | 4 | 5,
    dishes: Menu[] = [],
    dishLimit: number
  ) {
    super(
      x,
      y,
      "cooker",
      gender,
      name,
      "厨师",
      "餐厅必须员工，影响餐厅菜谱数量、餐厅吸引力、顾客满意度等",
      salary,
      ability,
      skills,
      energy,
      stability,
      status,
      rarity
    );
    this.dishes = dishes;
    this.dishLimit = dishLimit;
  }

  // 学习菜谱
  learnDish(menu: Menu) {
    if (this.dishes.length >= this.dishLimit) {
      return new Error("超出该厨师菜谱上限");
    }
    // 如果菜谱难度超过厨师能力
    if (menu.difficulty > this.ability.value) {
      return new Error("厨师能力不足学习该菜谱");
    }
    const probabilityOfSuccess =
      (this.ability.value - menu.difficulty + 10) / 50;
    if (random(probabilityOfSuccess)) {
      this.dishes.push(menu);
    } else {
      return new Error("厨师未能学会该菜谱，再试试吧");
    }
  }
}
