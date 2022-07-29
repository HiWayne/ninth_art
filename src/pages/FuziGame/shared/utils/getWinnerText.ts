import { randomText } from "./randomText";

export const getWinnerText = (findCount: number, speededTime: number) => {
  if (
    (findCount === 5 && speededTime <= 6000) ||
    (findCount === 6 && speededTime <= 7300)
  ) {
    return "实力太强了！您真是天降福神！";
  } else if (findCount >= 6) {
    return "收获了好多福气，实力与运气并存！";
  } else if (speededTime <= 1000) {
    return "速度真快！抢福气就是要快人一步~";
  } else {
    return randomText("winner");
  }
};
