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

  constructor() {
    this.currentTimeInGame = new Date().getTime();
    this.speed = 1;
    this.status = 1;
    this.restaurant = new Restaurant();
    this.updater = null as any;
    this.customers = [];
    this.timeRecorder = null as any;
    this.customerTimer = null as any;
  }
  getRestaurant() {
    return this.restaurant;
  }
  setUpdater(updater: DispatchWithoutAction) {
    this.updater = updater;
  }
  updateUI() {
    this.updater();
  }
  // 现实世界每500ms增加的时间（游戏中1天等于现实时间3分钟）
  addTime() {
    if (this._isPlaying()) {
      this.currentTimeInGame += 240000 * this.speed;
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
    this._recordTime();
    this._startCreateCustomer();
  }
  _recordTime() {
    this.timeRecorder = setInterval(() => this.addTime(), 500);
  }
  pause() {
    this.status = 2;
  }
  stop() {
    this.status = 3;
  }
  init() {
    this.status = 0;
    this.currentTimeInGame = new Date().getTime();
  }
  _isPlaying() {
    return this.status === 1;
  }
  _startCreateCustomer() {
    this.customerTimer = setInterval(() => {
      if (this._isPlaying()) {
        const customer = new Customer(
          0,
          randomNumber(0, 30),
          getNumberInNormalDistribution(60, 10),
          getNumberInNormalDistribution(60, 20),
          this.restaurant
        );
        this.customers.push(customer);
      } else {
        clearInterval(this.customerTimer);
      }
    }, 1000);
  }
  clearFromCustomers(customer: Customer) {
    const index = this.customers.findIndex(
      (_customer) => _customer === customer
    );
    this.customers.splice(index, 1);
  }
}
