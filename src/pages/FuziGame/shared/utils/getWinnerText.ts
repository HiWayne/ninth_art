import { randomText } from "./randomText";

export const getWinnerText = (findCount: number, speededTime: number) => {
  if (
    (findCount === 5 && speededTime <= 5500) ||
    (findCount === 6 && speededTime <= 7300)
  ) {
    return "实力爆棚！您真是天降福星！";
  } else if (findCount >= 6) {
    return "福气太多了，这次真的是福货满满！";
  } else if (speededTime <= 800) {
    return "速度真快！抢福气就是要快人一步~";
  } else {
    return randomText("winner");
  }
};
