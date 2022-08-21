import { ThingType } from "../../types";
import { Customer } from "../character";
import { Thing } from "./Thing";

export class Seat extends Thing {
  // 是否被使用
  use: boolean;
  // 使用者
  user: Customer | null;
  // 可容纳人数
  size: number;
  // 账单
  bill: number;

  constructor(type: ThingType) {
    super(type);
    this.use = false;
    this.size = 2;
    this.user = null;
    this.bill = 0;
    switch (type) {
      case "cheap":
        this.price = 50;
        this.maintenanceCost = 2;
        this._maintenanceCost = 2;
        break;
      case "ordinary":
        this.price = 120;
        this.maintenanceCost = 5;
        this._maintenanceCost = 5;
        break;
      case "slightlyBetter":
        this.price = 240;
        this.maintenanceCost = 10;
        this._maintenanceCost = 10;
        break;
      case "delicate":
        this.price = 520;
        this.maintenanceCost = 20;
        this._maintenanceCost = 20;
        break;
      case "gorgeous":
        this.price = 1200;
        this.maintenanceCost = 30;
        this._maintenanceCost = 30;
        break;
      case "featured":
        this.price = 1200;
        this.maintenanceCost = 30;
        this._maintenanceCost = 30;
        break;
      case "customized":
        this.price = 2400;
        this.maintenanceCost = 50;
        this._maintenanceCost = 50;
        break;
    }
  }

  useIt(user: Customer) {
    this.changeUse(true);
    this.changeUser(user);
  }

  notUseIt() {
    this.changeUse(false);
    this.changeUser(null);
  }

  changeUser(user: Customer | null) {
    this.user = user;
  }

  changeUse(use: boolean) {
    this.use = use;
  }

  getBill() {
    return this.bill;
  }
  changeBill(bill: number) {
    this.bill = bill;
  }

  upgradeSize() {
    if (this.size <= 6) {
      this.size += 2;
      this.maintenanceCost = this._maintenanceCost * (this.size / 2);
    }
  }

  downgradeSize() {
    if (this.size >= 4) {
      this.size -= 2;
      this.maintenanceCost = this._maintenanceCost * (this.size / 2);
    }
  }
}
