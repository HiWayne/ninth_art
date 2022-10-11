import { FenceWidth } from "../constant";
import { Position, StaffType } from "../types";
import { createStabilityProperty } from "../utils";
import {
  Cleaner,
  Cooker,
  Customer,
  Receptionist,
  SecurityGuard,
  Staff,
  Waiter,
} from "./character";
import { Enterprise } from "./Enterprise";
import { Bank } from "./finance";
import { Seat, Thing } from "./thing";
import { FoodMaterial } from "./thing/FoodMaterial";
import { kitchenUtensil } from "./thing/kitchenUtensil";
import { Menu } from "./thing/Menu";

export class Restaurant extends Enterprise {
  static gate: Position = { x: 0, y: 0 };
  // 餐厅形象：0-100，影响顾客进店概率、顾客心情
  private impression: number;
  // 对顾客的吸引力：0-100，影响顾客进店概率
  attractive: number;
  // 餐厅安全度：0-100，影响偷窃、盗窃概率与金额
  safety: number;
  // 餐厅服务水平：0-100，影响顾客满意度、顾客消费金额、餐厅对顾客吸引力
  serviceLevel: number;
  // 厨艺：0-100，影响餐厅对顾客吸引力、顾客满意度、顾客消费金额
  cooking: number;
  // 卫生：0-100，影响顾客满意度
  health: number;
  // 服务员队伍
  waiters: Waiter[];
  // 厨师队伍
  cookers: Cooker[];
  // 揽客员队伍
  receptionists: Receptionist[];
  // 清洁员队伍
  cleaners: Cleaner[];
  // 保安队伍
  securityGuards: SecurityGuard[];
  // 排队队伍
  waitingQueue: Customer[];
  // 就餐区大小
  diningAreaSize: number;
  // 厨房大小
  kitchenSize: number;
  // 其他面积大小
  otherSize: number;
  decorations: Thing[];
  // 座位数
  seats: Seat[];
  // 每月租金
  rent: number;
  // 菜单：由厨师的技能决定
  menus: Menu[];
  // 菜品原材料
  foodMaterials: FoodMaterial[];
  // 采购原材料折扣，1代表原价
  discount: number;
  // 运转效率：百分比，影响工作完成时间。比如厨师做饭时间10s，效率80%，实际时间12s。
  efficiency: number;
  // 店内就餐顾客
  peopleDining: Customer[];
  kitchenUtensils: kitchenUtensil[];

  bank: Bank;

  // 揽客员带来的吸引力
  _attractiveOfReceptionists: number;
  // 菜单带来的吸引力
  _attractiveOfMenus: number;
  // 店面大小带来嗯吸引力
  _attractiveOfExpanding: number;
  // 装修带来的吸引力
  _attractiveOfFurnish: number;

  // 保安带来的安全性
  _safetyOfSecurityGuards: number;

  // 清洁员带来的餐厅形象
  _impressionOfCleaners: number;

  constructor(
    cash = 100000,
    impression = 20,
    attractive = 15,
    safety = 10,
    serviceLevel = 10,
    health = 60,
    credibility = 10,
    waiters = [],
    cookers = [],
    receptionists = [],
    cleaners = [],
    securityGuards = [],
    waitingQueue = [],
    diningAreaSize = 42,
    kitchenSize = 6,
    kitchenUtensils = [new kitchenUtensil(0, 0, "cheap")],
    seats = [
      new Seat(FenceWidth * 3, FenceWidth * 5, "customized"),
      new Seat(FenceWidth * 3, FenceWidth * 9, "customized"),
    ],
    rent = 5000,
    menus = [],
    efficiency = 100,
    decorations = []
  ) {
    super(cash, credibility);
    this.impression = impression;
    this.attractive = attractive;
    this.safety = safety;
    this.serviceLevel = serviceLevel;
    this.health = health;
    this.waiters = waiters;
    this.cookers = cookers;
    this.receptionists = receptionists;
    this.cleaners = cleaners;
    this.securityGuards = securityGuards;
    this.waitingQueue = waitingQueue;
    this.diningAreaSize = diningAreaSize;
    this.kitchenSize = kitchenSize;
    this.otherSize = 0;
    this.kitchenUtensils = kitchenUtensils;
    this.seats = seats;
    this.rent = rent;
    this.menus = menus;
    this.foodMaterials = [];
    this.efficiency = efficiency;
    this.peopleDining = [];
    this.cooking = this.computeCooking();
    this.decorations = decorations;
    this.discount = 1;

    this.bank = new Bank();

    this._attractiveOfReceptionists = 0;
    this._attractiveOfMenus = 0;
    this._attractiveOfExpanding = 0;
    this._attractiveOfFurnish = 0;

    this._safetyOfSecurityGuards = 0;

    this._impressionOfCleaners = 0;
  }
  // 招募
  recruit(staff: Staff) {
    if (
      staff.type === "cooker" &&
      this.kitchenSize / 4 <= this.cookers.length
    ) {
      return new Error(`${this.kitchenSize / 4}`);
    }
    const staffQueue = this._getStaffQueue(staff.type);
    staffQueue.push(staff);
    this.effectByRecruiting(staff);
    return true;
  }
  // 解雇，并根据合法等级支付当月工作天数的工资或n+1赔偿
  fire(type: StaffType, index: number, legalLevel: 0 | 1 | 2 = 2) {
    const staffQueue = this._getStaffQueue(type);
    const staff = staffQueue[index];
    const workingDays = staff.workingDays;
    const workingYears = staff.workingYears;
    if (legalLevel === 0) {
      // 当月工资不付，n+1不赔
    } else if (legalLevel === 1) {
      // 只付当月工资
      const payedMoney = staff.salary.value * (workingDays / 30);
      if (this.getCash() >= payedMoney) {
        this.changeCash(this.getCash() - payedMoney);
      } else {
        return new Error(`${payedMoney}`);
      }
    } else if (legalLevel === 2) {
      // 付当月工资和n+1赔偿，n = 一年工龄多算2个月工资
      const payedMoney =
        staff.salary.value * (workingDays / 30) +
        (workingYears * 2 + 1) * staff.salary.value;
      if (this.getCash() >= payedMoney) {
        this.changeCash(this.getCash() - payedMoney);
      } else {
        return new Error(`${payedMoney}`);
      }
    }
    staffQueue.splice(index, 1);
    this.effectByFiring(staff);
    return true;
  }
  // 雇佣时产生的效果
  effectByRecruiting(staff: Staff) {
    switch (staff.type) {
      case "cooker":
        this.computeMenus();
        break;
      case "receptionist":
        this.computeAttractiveOfReceptionists();
        break;
      case "securityGuard":
        this.computeSafetyOfSecurityGuards();
        break;
      case "waiter":
        this.computeServiceLevel();
        break;
      case "cleaner":
        this.computeImpressionOfCleaners();
        this.computeHealthOfCleaners();
        break;
    }
  }
  // 解雇时产生的效果
  effectByFiring(staff: Staff) {
    switch (staff.type) {
      case "cooker":
        this.computeMenus();
        break;
      case "receptionist":
        this.computeAttractiveOfReceptionists();
        break;
      case "securityGuard":
        this.computeSafetyOfSecurityGuards();
        break;
      case "waiter":
        this.computeServiceLevel();
        break;
      case "cleaner":
        this.computeImpressionOfCleaners();
        this.computeHealthOfCleaners();
        break;
    }
  }
  // 发奖金，给指定员工们发months月数的奖金，可以提高员工稳定性（最高50）和工作精力
  giveOutBonus(staffs: Staff[], months: number) {
    const payedMoney = staffs.reduce(
      (money, staff) => money + staff.salary.value * months,
      0
    );
    if (this.getCash() >= payedMoney) {
      staffs.forEach((staff) => {
        staff.physicalStrength += months * 10;
        staff.stability = createStabilityProperty(
          staff.stability.value + Math.min(months * 5, 50)
        );
      });
    } else {
      return new Error(`${payedMoney}`);
    }
  }
  getImpression() {
    return this.impression;
  }
  changeImpression(impression: number) {
    this.impression = impression;
  }
  _getStaffQueue(type: StaffType) {
    switch (type) {
      case "cooker":
        return this.cookers;
      case "waiter":
        return this.waiters;
      case "cleaner":
        return this.cleaners;
      case "securityGuard":
        return this.securityGuards;
      case "receptionist":
        return this.receptionists;
      default:
        return [];
    }
  }
  // 购买座位
  buySeat(seat: Seat) {
    if (this.getCash() >= seat.price) {
      this.seats.push(seat);
      return true;
    } else {
      return new Error(`${this.getCash()}`);
    }
  }
  // 升级座位可容纳人数
  upgradeSeatSize(seat: Seat) {
    if (this.getCash() >= seat.price) {
      seat.upgradeSize();
      return true;
    } else {
      return new Error(`${this.getCash()}`);
    }
  }
  // 降级座位可容纳人数
  downgradeSeatSize(seat: Seat) {
    if (seat.size >= 4) {
      seat.downgradeSize();
      return true;
    } else {
      return new Error(`${seat.size}`);
    }
  }
  removeSeat(index: number) {
    this.seats.splice(index, 1);
  }
  // 购买厨具
  buyKitchenUtensil(kitchenUtensil: kitchenUtensil) {
    if (this.getCash() >= kitchenUtensil.price) {
      this.kitchenUtensils.push(kitchenUtensil);
      return true;
    } else {
      return new Error(`${this.getCash()}`);
    }
  }
  removeKitchenUtensil(index: number) {
    this.kitchenUtensils.splice(index, 1);
  }
  // 扩建就餐区
  expandDiningAreaSize(size: number) {
    this.diningAreaSize += size;
    this.rent = 5000 + (this.computeSize() - 3) * 500;
    this.computeAttractiveOfExpanding();
  }
  // 扩建厨房
  expandKitchenSize(size: number) {
    this.kitchenSize += size;
    this.rent = 5000 + (this.computeSize() - 3) * 500;
  }
  // 计算揽客员吸引力
  computeAttractiveOfReceptionists() {
    // 揽客员的效果存在边际递减，餐厅规模会抵消部分边际递减
    const attractiveOfReceptionists = Math.round(
      this.receptionists.reduce(
        (attractive, receptionist) =>
          attractive +
          10 *
            (receptionist.ability.value / 100) *
            ((10 + this.computeSize() / 5) / (10 + this.receptionists.length)),
        0
      )
    );
    this._attractiveOfReceptionists = attractiveOfReceptionists;
  }
  // 计算菜单吸引力
  computeAttractiveOfMenus() {
    const attractiveOfMenus = Math.round(
      this.menus.reduce(
        (attractive, menu) =>
          attractive + (0.3 * menu.difficulty + 0.7 * menu.rarity) / 10,
        0
      )
    );
    this._attractiveOfMenus = attractiveOfMenus;
  }
  // 计算店面大小带来的吸引力
  computeAttractiveOfExpanding() {
    const size = this.computeSize();
    this._attractiveOfExpanding = (size * 0.5 + size) * (100 / (100 + size));
  }
  // 计算装修带来的吸引力
  computeAttractiveOfFurnish() {
    const attractiveOfSeats = this.seats.reduce(
      (attractiveOfSeats, seat) =>
        attractiveOfSeats + seat.attractive * (6 / (6 + this.seats.length)),
      0
    );
    this._attractiveOfFurnish = attractiveOfSeats;
  }
  // 计算保安带来的安全性
  computeSafetyOfSecurityGuards() {
    // 保安的效果随餐厅规模边际递减
    this._safetyOfSecurityGuards = Math.round(
      this.securityGuards.reduce(
        (safety, securityGuard) =>
          safety +
          10 *
            (securityGuard.ability.value / 100) *
            (10 / (10 + this.computeSize())),
        0
      )
    );
  }
  // 计算服务水平
  computeServiceLevel() {
    // 服务员的效果随座位规模边际递减
    this.serviceLevel = Math.round(
      this.waiters.reduce(
        (serviceLevel, waiter) =>
          serviceLevel +
          10 * (waiter.ability.value / 100) * (20 / (20 + this.seats.length)),
        0
      )
    );
  }
  // 计算清洁员带来的餐厅形象
  computeImpressionOfCleaners() {
    // 清洁员的效果存在边际递减
    const impressionOfCleaners = Math.round(
      this.cleaners.reduce(
        (impression, cleaner) =>
          impression +
          5 *
            (cleaner.ability.value / 100) *
            (20 / (20 + this.computeSize() + this.cleaners.length)),
        0
      )
    );
    this._impressionOfCleaners = impressionOfCleaners;
  }
  // 计算清洁员带来的餐厅卫生
  computeHealthOfCleaners() {
    // 清洁员的效果存在边际递减
    const impressionOfCleaners = Math.round(
      this.cleaners.reduce(
        (health, cleaner) =>
          health +
          5 *
            (cleaner.ability.value / 100) *
            (20 / (20 + this.computeSize() + this.cleaners.length)),
        0
      )
    );
    this._impressionOfCleaners = impressionOfCleaners;
  }
  // 计算厨艺，由水平最高的厨师和所有菜的稀有度决定
  computeCooking() {
    const cookingOfCookers = this.cookers.reduce(
      (cookingOfCookers, cooker) =>
        cookingOfCookers < cooker.ability.value
          ? cooker.ability.value
          : cookingOfCookers,
      0
    );
    const cookingOfMenus = this.menus.reduce(
      (cookingOfMenus, menu) => cookingOfMenus + menu.rarity / 10,
      0
    );
    return Math.round(cookingOfCookers * 0.4 + cookingOfMenus * 0.6);
  }
  // 计算菜单种类
  computeMenus() {
    const menus = this.cookers.reduce((menus, cooker) => {
      cooker.dishes.forEach((menu) => {
        menus.add(menu);
      });
      return menus;
    }, new Set([] as Menu[]));
    this.menus = Array.from(menus);
  }

  addDecoration(decoration: Thing) {
    this.decorations = [...this.decorations, decoration];
  }
  removeDecoration(decoration: Thing) {
    const index = this.decorations.findIndex(
      (_decoration) => _decoration === decoration
    );
    const decorations = [...this.decorations];
    decorations.splice(index, 1);
    this.decorations = decorations;
  }

  // 计算店面大小
  computeSize() {
    return (
      this.diningAreaSize +
      this.kitchenSize +
      this.decorations.reduce((size, decoration) => size + decoration.size, 0)
    );
  }

  // 购买食材
  buyFoodMaterials(foodMaterials: { price: number; number: number }[]) {
    const money = foodMaterials.reduce(
      (cost, foodMaterial) => cost + foodMaterial.price * foodMaterial.number,
      0
    );
    if (this.getCash() >= money * this.discount) {
      this.changeCash(this.getCash() - money * this.discount);
    } else {
      return new Error(`${money * this.discount}`);
    }
  }

  // 计算所有菜谱所需食材
  computeFoodMaterialsNames() {
    return Array.from(
      new Set(
        this.menus.reduce((foodMaterials, menu) => {
          foodMaterials.push(
            ...menu.foodMaterials.map(
              (foodMaterial) => foodMaterial.foodMaterial.name
            )
          );
          return foodMaterials;
        }, [] as string[])
      )
    );
  }

  // 每月支付开支：员工工资、房租、维护成本、贷款
  settleAccountsMonthly() {
    const cookersSalary = this.cookers.reduce((cookersSalary, cooker) => {
      if (cooker.payrollSuspension) {
        cooker.changeArrearsOfWages(
          cooker.arrearsOfWages + cooker.salary.value
        );
        return cookersSalary;
      }
      return cookersSalary + cooker.salary.value;
    }, 0);

    const waitersSalary = this.waiters.reduce((waitersSalary, waiter) => {
      if (waiter.payrollSuspension) {
        waiter.changeArrearsOfWages(
          waiter.arrearsOfWages + waiter.salary.value
        );
        return waitersSalary;
      }
      return waitersSalary + waiter.salary.value;
    }, 0);

    const cleanersSalary = this.cleaners.reduce((cleanersSalary, cleaner) => {
      if (cleaner.payrollSuspension) {
        cleaner.changeArrearsOfWages(
          cleaner.arrearsOfWages + cleaner.salary.value
        );
        return cleanersSalary;
      }
      return cleanersSalary + cleaner.salary.value;
    }, 0);

    const receptionistsSalary = this.receptionists.reduce(
      (receptionistsSalary, receptionist) => {
        if (receptionist.payrollSuspension) {
          receptionist.changeArrearsOfWages(
            receptionist.arrearsOfWages + receptionist.salary.value
          );
          return receptionistsSalary;
        }
        return receptionistsSalary + receptionist.salary.value;
      },
      0
    );

    const securityGuardsSalary = this.securityGuards.reduce(
      (securityGuardsSalary, securityGuard) => {
        if (securityGuard.payrollSuspension) {
          securityGuard.changeArrearsOfWages(
            securityGuard.arrearsOfWages + securityGuard.salary.value
          );
          return securityGuardsSalary;
        }
        return securityGuardsSalary + securityGuard.salary.value;
      },
      0
    );

    // 员工工资
    const staffSalary = Math.round(
      cookersSalary +
        waitersSalary +
        receptionistsSalary +
        cleanersSalary +
        securityGuardsSalary
    );

    // 买菜成本（按每个菜只准备1份计算）
    const groceryShoppingCost = Math.round(
      this.menus.reduce(
        (cost, menu) =>
          cost +
          menu.foodMaterials.reduce(
            (_cost, foodMaterial) =>
              _cost + foodMaterial.cost * foodMaterial.foodMaterial.price,
            0
          ),
        0
      )
    );

    // 房租
    const rent = this.rent;

    // 维护成本：座位、厨具
    const maintenanceCostOfSeats = this.seats.reduce(
      (maintenanceCost, seat) => maintenanceCost + seat.maintenanceCost,
      0
    );
    const maintenanceCostOfKitchenUtensils = this.kitchenUtensils.reduce(
      (maintenanceCost, kitchenUtensil) =>
        maintenanceCost + kitchenUtensil.maintenanceCost,
      0
    );
    // 总维护成本
    const maintenanceCost = Math.round(
      maintenanceCostOfSeats +
        maintenanceCostOfKitchenUtensils +
        this.decorations.reduce(
          (cost, decoration) => cost + decoration.maintenanceCost,
          0
        )
    );

    // 贷款每期，含本金
    const loans = Math.round(
      this.bank.loans.reduce(
        (money, loan) =>
          money + (loan.value * (1 + loan.APR)) / loan.loanPeriod,
        0
      )
    );

    return {
      staffSalary,
      groceryShoppingCost,
      rent,
      maintenanceCost,
      loans,
      total: staffSalary + groceryShoppingCost + rent + maintenanceCost + loans,
    };
  }
  // 计算餐厅可容纳人数
  computeCapacity() {
    return this.seats.reduce((capacity, seat) => capacity + seat.size, 0);
  }
  // 返回任意空座
  hasAnyVacancies(): Seat | null {
    let vacancy = null;
    this.seats.some((seat) => {
      const notUse = !seat.use;
      if (notUse) {
        vacancy = seat;
      }
      return notUse;
    });
    return vacancy;
  }
}
