import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class SecurityGuard extends Staff {
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
      "securityGuard",
      "保安",
      "提高餐厅安全度，影响顾客被偷窃的概率和金额、餐厅夜间被盗窃的概率和金额",
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
