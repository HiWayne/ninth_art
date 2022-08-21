import { game } from "../../index";
import { Enterprise } from "../Enterprise";

export class Loan {
  // 贷款金额
  value: number;
  // 年利率
  APR: number;
  // 开始时间
  startTime: number;
  // 上一次还款时间
  prevTime: number;
  // 贷款期数，单位期，每期等于30天
  loanPeriod: number;
  // 剩余期数
  remainingPeriod: number;
  // 贷款人
  subject: Enterprise;
  // 失信次数
  breakPromiseCount: number;
  constructor(
    value: number,
    APR: number,
    loanPeriod: number,
    subject: Enterprise
  ) {
    this.value = value;
    this.APR = APR;
    this.loanPeriod = loanPeriod;
    this.subject = subject;
    this.startTime = game.getCurrentTimeInGame();
    this.prevTime = 0;
    this.remainingPeriod = loanPeriod;
    this.breakPromiseCount = 0;
  }
}
