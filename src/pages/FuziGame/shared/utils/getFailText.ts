import { randomText } from "./randomText";

export const getFailText = (
  findCount: number,
  totalCount: number,
  speededTime: number
) => {
  if (totalCount - findCount === 1 && totalCount >= 2) {
    return "太可惜了，就差一个 -_-!";
  } else if (speededTime >= 8500) {
    return "鏖战至此，虽败犹荣！";
  } else if (totalCount >= 6) {
    return "不怪你~ 福气太多了抢不过来";
  } else if (totalCount === 1) {
    return "这个水平有点说不过去哦~加油吧";
  } else {
    return randomText("loser");
  }
};
