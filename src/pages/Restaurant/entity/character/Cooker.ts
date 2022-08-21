import { Menu } from "../thing/Menu";
import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class Cooker extends Staff<Menu> {
  dishes: Menu[];
  constructor(
    x: number,
    y: number,
    salary: number,
    ability: number,
    skills: Skill[],
    energy: number,
    stability: number,
    status: number = 0,
    rarity: number,
    dishes: Menu[] = []
  ) {
    super(
      x,
      y,
      "cooker",
      "厨师",
      "影响做菜时间、顾客满意度、餐厅运转效率等",
      salary,
      ability,
      skills,
      energy,
      stability,
      status,
      rarity
    );
    this.dishes = dishes;
  }
}
