import { Skill } from "./Skill";
import { Staff } from "./Staff";

export class Receptionist extends Staff {
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
      "receptionist",
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
