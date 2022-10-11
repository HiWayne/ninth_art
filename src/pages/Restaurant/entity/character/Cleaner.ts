import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class Cleaner extends Staff {
  constructor(
    x: number,
    y: number,
    gender: 0 | 1,
    name: string,
    salary: number,
    ability: number,
    skills: Skill[],
    energy: number,
    stability: number,
    status: number = 0,
    rarity: 1 | 2 | 3 | 4 | 5
  ) {
    super(
      x,
      y,
      "cleaner",
      gender,
      name,
      "清洁员",
      "影响餐厅形象和卫生，间接影响顾客吸引力和满意度",
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
