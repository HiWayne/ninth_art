import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class Receptionist extends Staff {
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
      "receptionist",
      gender,
      name,
      "揽客员",
      "提高顾客进店概率，并且当餐厅对顾客没有吸引力时，揽客员也能招揽到客人",
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
