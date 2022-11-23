import { game } from "@/store/restaurant";
import { Enterprise } from "../Enterprise";
import { Investment } from "./Investment";
import { Loan } from "./Loan";
import { Stock } from "./Stock";

export class Bank {
  // 结算利息的单位时间
  static UNIT_OF_TIME = 30;
  static APR = 0.07;
  // 餐厅放在银行的正在进行的投资
  investments: Investment[];
  // 到期的投资
  maturityInvestments: Investment[];
  // 贷款
  loans: Loan[];

  constructor() {
    this.investments = [];
    this.maturityInvestments = [];
    this.loans = [];
  }
  // 找银行投资
  invest(principal: number, investingTime: number, investedTarget: Stock) {
    this.investments.push({
      principal,
      revenue: principal,
      startTime: game.getCurrentTimeInGame(),
      investingTime,
      target: investedTarget,
    });
  }
  // 提前取钱，只返还本金
  withdrawMoney(index: number) {
    const investment = this.investments.splice(index, 1);
    return investment[0].principal;
  }
  // 每期结算投资利润，如果有到期的返还本金和利息
  settleAccounts() {
    const profit = this.investments.reduce((money, investment) => {
      const expired = this._judgeExpire(investment);
      // 如果到期了返还本金+利息
      if (expired) {
        return (
          money + investment.revenue * (1 + investment.target.interestRate)
        );
      }
      return money;
    }, 0);
    const investments = this.investments.map((investment) => ({
      ...investment,
      revenue: investment.revenue * (1 + investment.target.interestRate),
      investingTime: investment.investingTime + Bank.UNIT_OF_TIME,
    }));
    this.investments = investments.filter((investment) => {
      const expired = this._judgeExpire(investment);
      return !expired;
    });
    return profit;
  }
  // 放款
  grantLoan(subject: Enterprise, money: number, loanPeriod: number) {
    const canLoanedMoney = this.computeMoney(
      subject.getCredibility(),
      subject.getCash()
    );
    if (money <= canLoanedMoney) {
      this.loans.push(new Loan(money, Bank.APR, loanPeriod, subject));
      subject.changeCash(subject.getCash() + money);
      subject.updateLoans(this.loans);
      return true;
    } else {
      return new Error(`${canLoanedMoney}`);
    }
  }
  // 计算还款金额，type: 0-只还利息，1-利息+本金
  getCollectingMoney(type: 0 | 1) {
    let collectionMoney = 0;
    if (type === 0) {
      collectionMoney = this.loans.reduce((money, loan) => {
        // 现在距上一次还款超过30天
        if (
          game.getCurrentTimeInGame() - loan.prevTime >=
          30 * 24 * 3600 * 1000
        ) {
          const payedMoney = loan.value * (loan.APR / loan.loanPeriod);
          // 最后一期，要算上本金
          if (loan.remainingPeriod === 1) {
            return money + payedMoney + loan.value;
          }
          return money + payedMoney;
        } else {
          return money;
        }
      }, 0);
    } else if (type === 1) {
      collectionMoney = this.loans.reduce((money, loan) => {
        // 现在距上一次还款超过30天
        if (
          game.getCurrentTimeInGame() - loan.prevTime >=
          30 * 24 * 3600 * 1000
        ) {
          const payedMoney =
            loan.value * (loan.APR / loan.loanPeriod) +
            loan.value / loan.loanPeriod;
          loan.value -= loan.value / loan.loanPeriod;
          // 最后一期，要算上本金
          if (loan.remainingPeriod === 1) {
            return money + payedMoney + loan.value;
          }
          return money + payedMoney;
        } else {
          return money;
        }
      }, 0);
    }
  }
  // 还贷成功后
  collectMoneySuccess() {
    const loans = [...this.loans];
    loans.forEach((loan) => {
      loan.remainingPeriod--;
      if (loan.remainingPeriod === 0) {
        const index = this.loans.findIndex((_loan) => _loan === loan);
        this.loans.splice(index, 1);
        loan.subject.updateLoans(this.loans);
        this.trustworthy(loan);
        if (this.loans.length === 0) {
          if (loan.subject.getCredibility() < 0) {
            loan.subject.changeCredibility(0);
          }
        }
      }
    });
  }
  // 不能还贷
  collectMoneyFail(type: 0 | 1) {
    const loans = [...this.loans];
    loans.forEach((loan) => {
      let money = 0;
      if (type === 0) {
        if (loan.remainingPeriod > 1) {
          money = (loan.value * loan.APR) / loan.loanPeriod;
        } else {
          money = (loan.value * loan.APR) / loan.loanPeriod + loan.value;
        }
      } else if (type === 1) {
        money = (loan.value * (1 + loan.APR)) / loan.loanPeriod;
      }
      if (loan.subject.getCash() >= money) {
        loan.subject.changeCash(loan.subject.getCash() - money);
        loan.remainingPeriod--;
        if (loan.remainingPeriod === 0) {
          const index = this.loans.findIndex((_loan) => _loan === loan);
          this.loans.splice(index, 1);
        }
      } else {
        this.breakPromise(loan);
      }
    });
  }
  // 贷款守信
  trustworthy(loan: Loan) {
    loan.subject.changeCredibility(
      loan.subject.getCredibility() +
        Math.max((loan.value / 50000) * (loan.loanPeriod / 12), 1)
    );
  }
  // 贷款失信
  breakPromise(loan: Loan) {
    loan.subject.changeCredibility(
      loan.subject.getCredibility() -
        Math.min(
          Math.max(loan.value / 100000 / (3 / loan.breakPromiseCount), 1),
          Math.max(loan.value / 100000, 1)
        )
    );
    loan.breakPromiseCount++;
  }
  _judgeExpire(investment: Investment) {
    return (
      investment.startTime + investment.investingTime <=
      game.getCurrentTimeInGame()
    );
  }
  // 根据信誉和现金数计算贷款额度
  computeMoney(credibility: number, cash: number) {
    const score =
      credibility * 0.8 + Math.min(Math.max(cash / 10000, 0), 100) * 0.2;
    let money = 0;
    if (score <= 0) {
      money = 0;
    } else if (score > 0 && score <= 20) {
      money += score * 15000;
    } else if (score > 20 && score <= 40) {
      money += 20 * 15000 + (score - 20) * 15000;
    } else if (score > 40 && score <= 60) {
      money += 20 * 15000 + 20 * 15000 + (score - 40) * 20000;
    } else if (score > 60 && score <= 80) {
      money += 20 * 15000 + 20 * 15000 + 20 * 20000 + (score - 60) * 40000;
    } else if (score > 80) {
      money +=
        20 * 15000 +
        20 * 15000 +
        20 * 20000 +
        20 * 40000 +
        (score - 80) * 80000;
    }
    return money;
  }
}
