import { ThingType } from "../../types";
import { Physics } from "../Physics";

export class Thing extends Physics {
  type: ThingType;
  // 吸引力
  attractive: number;
  // 单价
  price: number;
  // 每月维护成本
  maintenanceCost: number;
  // 每月维护成本单价
  _maintenanceCost: number;

  constructor(x: number, y: number, type: ThingType) {
    super(x, y);
    this.type = type;
    this.price = 0;
    this.maintenanceCost = 0;
    this._maintenanceCost = 0;
    switch (type) {
      case "cheap":
        this.attractive = 0;
        break;
      case "ordinary":
        this.attractive = 0;
        break;
      case "slightlyBetter":
        this.attractive = 0.12;
        break;
      case "delicate":
        this.attractive = 0.25;
        break;
      case "gorgeous":
        this.attractive = 0.5;
        break;
      case "featured":
        this.attractive = 0.75;
        break;
      case "customized":
        this.attractive = 1;
        break;
    }
  }
}
