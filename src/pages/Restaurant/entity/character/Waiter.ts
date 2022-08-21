import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class Waiter extends Staff {
  constructor(
    salary: number,
    ability: number,
    skills: Skill[],
    energy: number,
    stability: number,
    status: number = 0,
    rarity: number
  ) {
    super(
      "waiter",
      "服务员",
      "影响顾客满意度、顾客消费金额、餐厅运转效率等",
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
