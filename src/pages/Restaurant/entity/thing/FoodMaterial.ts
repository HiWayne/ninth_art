export class FoodMaterial {
  name: string;
  price: number;
  number: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this.number = 0;
  }
}
