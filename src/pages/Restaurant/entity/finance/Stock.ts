// 股票
export class Stock {
  name: string;
  // 投资利率，随时间波动。投资到期时才能收获利息，提前取款只有本金
  interestRate: number;
  active: boolean;
  constructor(name: string, interestRate: number) {
    this.name = name;
    this.interestRate = interestRate;
    this.active = true;
  }
  changeInterestRate(interestRate: number) {
    this.interestRate = interestRate;
  }
  changeActive(active: boolean) {
    this.active = active;
  }
}
