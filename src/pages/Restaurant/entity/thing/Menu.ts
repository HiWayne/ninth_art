import { FoodMaterial } from "./FoodMaterial";

export class Menu {
  // 菜名
  name: string;
  // 定价
  price: number;
  // 原材料
  foodMaterials: { foodMaterial: FoodMaterial; cost: number }[];
  // 难度：0-100
  difficulty: number;
  // 稀有度：0-100，受欢迎程度
  rarity: number;
  // 厨艺：0-100，某人对这道菜的厨艺
  cooking: number;
  // 原始厨艺，可能有加成
  _cooking: number;
  // 烹饪时间，10 -> 10秒
  time: number;

  constructor(
    rarity: number,
    name: string,
    price: number,
    foodMaterials: { foodMaterial: FoodMaterial; cost: number }[],
    difficulty: number,
    cooking: number,
    time: number
  ) {
    this.name = name;
    this.price = price;
    this.foodMaterials = foodMaterials;
    this.difficulty = difficulty;
    this.rarity = rarity;
    this.cooking = cooking;
    this._cooking = cooking;
    this.time = time;
  }
}
