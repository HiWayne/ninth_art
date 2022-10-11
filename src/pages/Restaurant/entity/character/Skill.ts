import { Restaurant } from "../Restaurant";
import { Staff } from "./Staff";

export class Skill<T extends Staff = Staff> {
  // 技能名称
  name: string;
  desc: string;
  // 技能影响
  effect: (restaurant: Restaurant, self: T) => void;
  // 恢复成使用技能前
  inEffect: (restaurant: Restaurant, self: T) => void;
  // 技能稀有度：1-5
  rarity: 1 | 2 | 3 | 4 | 5;
  // 是否唯一
  only: boolean;
  constructor(
    rarity: 1 | 2 | 3 | 4 | 5,
    name: string,
    desc: string,
    effect: (restaurant: Restaurant, self: T) => void,
    inEffect: (restaurant: Restaurant, self: T) => void,
    only: boolean = false
  ) {
    this.rarity = rarity;
    this.name = name;
    this.desc = desc;
    this.effect = effect;
    this.inEffect = inEffect;
    this.only = only;
  }
}
