import { FoodMaterial } from "./FoodMaterial";

export class Menu {
  // 菜名
  name: string;
  // 定价
  price: number;
  // 原材料
  foodMaterials: FoodMaterial[];
  // 难度：0-100
  difficulty: number;
  // 稀有度：0-100，受欢迎程度
  rarity: number;

  constructor(
    name: string,
    price: number,
    foodMaterials: FoodMaterial[],
    difficulty: number,
    rarity: number
  ) {
    this.name = name;
    this.price = price;
    this.foodMaterials = foodMaterials;
    this.difficulty = difficulty;
    this.rarity = rarity;
  }
}
