import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class Cleaner extends Staff {
  constructor(
    x: number,
    y: number,
    salary: number,
    ability: number,
    skills: Skill[],
    energy: number,
    stability: number,
    status: number = 0,
    rarity: number
  ) {
    super(
      x,
      y,
      "cleaner",
      "清洁员",
      "影响打扫卫生的速度，间接影响顾客满意度、餐厅运转效率",
      salary,
      ability,
      skills,
      energy,
      stability,
      status,
      rarity
    );
  }
}
