export class FoodMaterial {
  name: string;
  price: number;
  number: number;
  // 菜消耗
  dishCost: number;
  constructor(
    name: string,
    price: number,
    number: number = 0,
    dishCost: number = 1
  ) {
    this.name = name;
    this.price = price;
    this.number = number;
    this.dishCost = dishCost;
  }

  changeNumber(number: number) {
    this.number = number;
  }
}
