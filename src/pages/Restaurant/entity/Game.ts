import { getNumberInNormalDistribution } from "@/shared/utils/getNumberInNormalDistribution";
import { randomNumber } from "@/shared/utils/randomNumber";
import { DispatchWithoutAction } from "react";
import { Customer } from "./character";
import { Restaurant } from "./Restaurant";

export class Game {
  // 游戏中的时间，timestamp
  private currentTimeInGame: number;
  // 游戏状态：0-初始化，1-运行，2-暂停，3-结束
  private status: number;
  // 倍速：0.3-5
  private speed: number;
  private restaurant: Restaurant;
  private updater: DispatchWithoutAction;
  private customers: Customer[];
  private timeRecorder: number;
  private customerTimer: number;
  // 全局自增id
  private nextId: number;

  constructor() {
    this.currentTimeInGame = new Date().getTime();
    this.speed = 1;
    this.status = 1;
    this.restaurant = new Restaurant();
    this.updater = null as any;
    this.customers = [];
    this.timeRecorder = null as any;
    this.customerTimer = null as any;
    this.nextId = 0;
  }
  getNextId() {
    this.nextId++;
    return this.nextId;
  }
  getRestaurant() {
    return this.restaurant;
  }
  getCustomers() {
    return this.customers;
  }
  setUpdater(updater: DispatchWithoutAction) {
    this.updater = updater;
  }
  updateUI() {
    this.updater();
  }
  // 现实世界每1s增加的时间（游戏中1天等于现实时间2分钟）
  addTime() {
    if (this._isPlaying()) {
      this.currentTimeInGame += 320000 * this.speed;
    } else {
      clearInterval(this.timeRecorder);
    }
  }
  getCurrentTimeInGame() {
    return this.currentTimeInGame;
  }
  getSpeed() {
    return this.speed;
  }
  changeSpeed(speed: number) {
    this.speed = speed;
  }
  getGameStatus() {
    return this.status;
  }
  play() {
    this.status = 1;
    // 时间
    this._recordTime();
    // 产生顾客
    this._startCreateCustomer();
  }
  _recordTime() {
    this.timeRecorder = setInterval(() => this.addTime(), 1000);
  }
  pause() {
    this.status = 2;
    clearInterval(this.customerTimer);
  }
  stop() {
    this.status = 3;
    clearInterval(this.customerTimer);
  }
  init() {
    this.status = 0;
    this.currentTimeInGame = new Date().getTime();
  }
  _isPlaying() {
    return this.status === 1;
  }
  _startCreateCustomer() {
    const timeout = () => {
      setTimeout(() => {
        if (this._isPlaying()) {
          const customer = new Customer(
            this.getNextId(),
            0,
            randomNumber(0, 30),
            getNumberInNormalDistribution(60, 10),
            getNumberInNormalDistribution(60, 20),
            this.restaurant
          );
          this.customers = [...this.customers, customer];
          this.updateUI();
          timeout();
        } else {
          return;
        }
      }, this._getIntervalOfHumanTraffic());
    };
    timeout();
  }
  // 代表客流量的时间间隔
  _getIntervalOfHumanTraffic() {
    return randomNumber(20, 100) * 100;
  }
  clearFromCustomers(customer: Customer) {
    const index = this.customers.findIndex(
      (_customer) => _customer === customer
    );
    this.customers.splice(index, 1);
  }
}
