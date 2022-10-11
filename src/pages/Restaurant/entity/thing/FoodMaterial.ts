export class FoodMaterial {
  name: string;
  price: number;
  number: number;
  constructor(name: string, price: number, number: number = 0) {
    this.name = name;
    this.price = price;
    this.number = number;
  }

  changeNumber(number: number) {
    this.number = number;
  }
}
