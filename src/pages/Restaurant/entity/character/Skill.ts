import { Restaurant } from "../Restaurant";

export class Skill<T = any> {
  // 技能名称
  name: string;
  desc: string;
  // 技能影响
  effect: (restaurant: Restaurant) => void;
  // 技能稀有度：1-5
  rarity: number;
  data: T;
  // 熟练度
  proficiency: number;
  constructor(
    rarity: number,
    name: string,
    desc: string,
    effect: (restaurant: Restaurant) => void,
    data: T,
    proficiency: number
  ) {
    this.rarity = rarity;
    this.name = name;
    this.desc = desc;
    this.effect = effect;
    this.data = data;
    this.proficiency = proficiency;
  }
}
