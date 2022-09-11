import { Stock } from "./Stock";

export interface Investment {
  // 投资本金
  principal: number;
  // 总收入，本金+利息
  revenue: number;
  // 投资开始时间
  startTime: number;
  // 投资期限
  investingTime: number;
  target: Stock;
}
