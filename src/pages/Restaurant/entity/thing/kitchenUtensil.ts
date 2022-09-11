import { ThingType } from "../../types";
import { Thing } from "./Thing";

export class kitchenUtensil extends Thing {
  constructor(x: number, y: number, type: ThingType) {
    super('厨具', x, y, type);
    switch (type) {
      case "cheap":
        this.price = 50;
        this.maintenanceCost = 2;
        break;
      case "ordinary":
        this.price = 120;
        this.maintenanceCost = 5;
        break;
      case "slightlyBetter":
        this.price = 240;
        this.maintenanceCost = 10;
        break;
      case "delicate":
        this.price = 520;
        this.maintenanceCost = 20;
        break;
      case "gorgeous":
        this.price = 1200;
        this.maintenanceCost = 30;
        break;
      case "featured":
        this.price = 1200;
        this.maintenanceCost = 30;
        break;
      case "customized":
        this.price = 2400;
        this.maintenanceCost = 50;
        break;
    }
  }
}
