import { random } from "@/shared/utils/random";
import { randomlyTaken } from "@/shared/utils/randomlyTaken";
import { randomNumber } from "@/shared/utils/randomNumber";
import { game } from "../../index";
import { Restaurant } from "../index";
import { Physics } from "../Physics";
import { Seat } from "../thing";
import { Menu } from "../thing/Menu";

export class Customer extends Physics {
  // 消费能力：0-100
  consumptionLevel: number;
  // 要求：0-100，心情指数>=要求视为满意，满意度越高小费越高
  requirement: number;
  // 心情：0-100
  mood: number;
  // 所处的店
  place: Restaurant;
  // 排队开始时间
  queueStart: number;
  // 排队结束时间
  queueEnd: number;
  // 座位
  seat: Seat | null;
  // 点的菜
  dishes: Menu[];
  // 状态：0-未进店、1-排队、2-进店、3-点餐、4-等餐、5-用餐、6-结束、7-不进店
  status: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  constructor(
    x: number,
    y: number,
    consumptionLevel: number,
    mood: number,
    place: Restaurant
  ) {
    super(x, y);
    this.consumptionLevel = consumptionLevel;
    this.requirement = Math.round(
      consumptionLevel * (1 + randomNumber(-2, 2) / 10)
    );
    this.mood = mood;
    this.place = place;
    this.queueStart = 0;
    this.queueEnd = 0;
    this.seat = null;
    this.dishes = [];
    this.status = 0;
  }
  // 进店或排队
  intoStore() {
    const into = random(this.computeIntoStoreProbability());
    if (into) {
      const seat = this.place.hasAnyVacancies();
      if (seat) {
        // 进店
        this.status = 2;
        this._sitDown(seat);
      } else {
        this.queueStart = game.getCurrentTimeInGame();
        // 排队
        this.waitingInQueue();
      }
    } else {
      this.status = 7;
    }
    return into;
  }
  // 坐下。如果餐厅形象不错，会增加顾客心情
  _sitDown(seat: Seat) {
    seat.useIt(this);
    this.seat = seat;
    if (this.place.getImpression() >= 50) {
      this.mood += this.place.getImpression() / 100;
    }
  }
  // 排队结束
  waitingQueueEnd() {
    this.queueEnd = game.getCurrentTimeInGame();
    const index = this.place.waitingQueue.findIndex(
      (customer) => customer === this
    );
    this.place.waitingQueue.splice(index, 1);
    const seat = this.place.hasAnyVacancies();
    if (seat) {
      this._sitDown(seat);
    }
  }
  // 离开
  leave() {
    // 结束
    this.status = 6;
    if (this.seat) {
      this.seat.notUseIt();
      this.seat = null;
    } else {
      // 还在排队
      const index = this.place.waitingQueue.findIndex(
        (customer) => customer === this
      );
      // 离开
      this.place.waitingQueue.splice(index, 1);
    }
  }
  changeMood(mood: number) {
    this.mood = mood;
  }
  // 点菜
  orderDishes() {
    this.status = 3;
    this.queueEnd = game.getCurrentTimeInGame();
    // 排队时间少心情+10
    if (this.queueEnd - this.queueStart <= 480 / 1000 / 2) {
      this.mood += 10;
    } else {
      // TODO: 排队心情减少应该在外部轮训时做，每等真实世界的10秒钟降低1心情
      this.mood -= (this.queueEnd - this.queueStart) / 480 / 1000 / 10;
    }
    this.mood = Math.max(this.mood, 0);
    // 如果餐厅没有菜单，餐厅口碑-1
    if (this.place.menus.size === 0) {
      this.place.changeImpression(this.place.getImpression() - 1);
      this.leave();
      return this.dishes;
    }
    const satisfaction = this.mood - this.requirement;
    const orderLevel = this.consumptionLevel + satisfaction;
    const menus = Array.from(this.place.menus);
    menus.sort((a, b) => b.price - a.price);
    const partition = Math.max(Math.round(menus.length / 4), 1);
    const expensive = menus.slice(0, partition);
    const normal = menus.slice(partition);
    if (orderLevel >= 90) {
      // 点4个贵菜
      if (expensive.length >= 4) {
        this.dishes = randomlyTaken(expensive, 4).result;
      } else {
        if (normal.length >= 4 - expensive.length) {
          const { result: otherDishes } = randomlyTaken(
            normal,
            4 - expensive.length
          );
          this.dishes = [...expensive, ...otherDishes];
        } else {
          this.dishes = menus;
        }
      }
    } else if (orderLevel >= 80) {
      // 点3个贵菜，1个随机菜
      if (expensive.length >= 3) {
        const { result: expensiveDishes, remaining } = randomlyTaken(
          expensive,
          3
        );
        const { result: randomDish } = randomlyTaken(
          [...remaining, ...normal],
          1
        );
        this.dishes = [...expensiveDishes, ...randomDish];
      } else {
        if (normal.length >= 4 - expensive.length) {
          const { result: otherDishes } = randomlyTaken(
            normal,
            4 - expensive.length
          );
          this.dishes = [...expensive, ...otherDishes];
        } else {
          this.dishes = menus;
        }
      }
    } else if (orderLevel >= 70) {
      // 点2个贵菜，2个随机菜
      if (expensive.length >= 2) {
        const { result: expensiveDishes, remaining } = randomlyTaken(
          expensive,
          2
        );
        const { result: randomDish } = randomlyTaken(
          [...remaining, ...normal],
          2
        );
        this.dishes = [...expensiveDishes, ...randomDish];
      } else {
        if (normal.length >= 4 - expensive.length) {
          const { result: otherDishes } = randomlyTaken(
            normal,
            4 - expensive.length
          );
          this.dishes = [...expensive, ...otherDishes];
        } else {
          this.dishes = menus;
        }
      }
    } else if (orderLevel >= 60) {
      // 点3个随机菜
      this.dishes = randomlyTaken(menus, 3).result;
    } else if (orderLevel >= 40) {
      // 点2-3个随机菜
      if (random(0.5)) {
        this.dishes = randomlyTaken(menus, 2).result;
      } else {
        this.dishes = randomlyTaken(menus, 3).result;
      }
    } else {
      // 点1-2个随机菜
      if (random(0.5)) {
        this.dishes = randomlyTaken(menus, 1).result;
      } else {
        this.dishes = randomlyTaken(menus, 2).result;
      }
    }
    // 账单记在座位上
    this.seat?.changeBill(
      this.dishes.reduce((bill, dish) => bill + dish.price, 0)
    );
    this.status = 4;
    return this.dishes;
  }
  // 用餐
  dining() {
    this.status = 5;
  }
  pay() {
    if (this.seat) {
      const bill = this.seat.getBill();
      this.place.changeCash(this.place.getCash() + bill);
      this.seat.changeBill(0);
    }
    this.leave();
  }
  // 计算进店可能性，和店面形象、店面吸引力、排队人数、服务水平决定
  computeIntoStoreProbability() {
    const capacity = this.place.computeCapacity();
    const probability =
      (this.place.getImpression() * 0.3 +
        this.place.attractive * 0.5 +
        this.place.serviceLevel * 0.2) *
      (capacity / (capacity + this.place.waitingQueue.length));
    return probability / 100;
  }
  waitingInQueue() {
    this.status = 1;
    this.place.waitingQueue.push(this);
  }
  walkToGate(x: number, y: number) {
    return this.moveToGradually(x, y);
  }
  walkToQueue() {}
  async walkLeave() {}
  walkToSeat(x: number, y: number) {}
  async walkFromSeatToGate(x: number, y: number) {}
  play() {
    switch (this.status) {
      case 0:
        this.walkToGate(Restaurant.gate.x, this.getY()).then(() => {
          this.intoStore();
        });
        break;
      case 1:
        this.walkToQueue();
        break;
      case 2:
        this.walkToSeat(this.seat!.getX(), this.seat!.getY());
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        this.walkFromSeatToGate(Restaurant.gate.x, Restaurant.gate.y).then(
          () => {
            this.destroy();
          }
        );
        break;
      case 7:
        this.walkLeave().then(() => {
          this.destroy();
        });
        break;
    }
  }
  destroy() {
    game.clearFromCustomers(this);
  }
}
