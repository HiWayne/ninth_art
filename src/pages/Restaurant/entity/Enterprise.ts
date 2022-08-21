import { Loan } from "./finance/Loan";

export class Enterprise {
  // 信誉度：0-100。信誉度影响贷款金额和笔数。贷款可以每期只偿还利息，最后再偿还全部本金；也可以每期都偿还本金和利息。未能及时还款会扣信誉度，低于0时银行不再贷款，并且强制偿还所有本金和利息
  private credibility: number;
  // 现金数
  private cash: number;
  private loans: Loan[];
  constructor(cash: number, credibility: number) {
    this.cash = cash;
    this.credibility = credibility;
    this.loans = [];
  }
  getCash() {
    return this.cash;
  }
  getCredibility() {
    return this.credibility;
  }
  changeCash(cash: number) {
    this.cash = cash;
  }
  changeCredibility(credibility: number) {
    this.credibility = credibility;
  }
  updateLoans(loans: Loan[]) {
    this.loans = loans;
  }
  // 还贷
  repayLoan(money: number) {
    if (this.getCash() >= money) {
      this.changeCash(this.getCash() - money);
      return true;
    } else {
      return new Error(`${this.getCash()}`);
    }
  }
  // 逾期
  overdue() {
    this.changeCredibility(this.getCredibility() - 1);
  }
}
