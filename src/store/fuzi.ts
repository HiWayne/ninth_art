import { TOTAL_TIME } from "@/pages/FuziGame/config";
import { Fuzi, GameResultEnum } from "@/pages/FuziGame/shared/types";

export type TotalCountComputer = (totalCount: number) => number;

export interface FuziStore {
  totalCount: number;
  countNoFind: number;
  remainingTime: number;
  speededTime: number;
  overtime: number;
  timePenalty: number;
  gameResult: GameResultEnum;
  fuziCards: Fuzi[];
  setTotalCount: (totalCount: number | TotalCountComputer) => void;
  setFuzi: (index: number, part: Partial<Fuzi>) => void;
  setCountNoFind: (countNoFind: number) => void;
  addCountNoFind: () => void;
  decreaseCountNoFind: () => void;
  setRemainingTime: (remainingTime: number) => void;
  setSpeededTime: (speededTime: number) => void;
  setOvertime: (time: number | ((prevTime: number) => number)) => void;
  setTimePenalty: (time: number | ((prevTime: number) => number)) => void;
  decreaseRemainingTime: (interval: number) => void;
  setGameResult: (gameResult: GameResultEnum) => void;
  setFuziCards: (fuziCards: Fuzi[]) => void;
}

const createFuziStore: (
  set: (
    nextStateOrUpdater: object | ((state: any) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => FuziStore = (set) => ({
  totalCount: 0,
  countNoFind: 0,
  remainingTime: TOTAL_TIME,
  // 实际花费的时间
  speededTime: 0,
  // 加时
  overtime: 0,
  // 罚时
  timePenalty: 0,
  // 0 - 进行中, 1 - 胜利, 2 - 失败
  gameResult: 0,
  fuziCards: [],
  setTotalCount(totalCount: number | TotalCountComputer) {
    set((state) => {
      if (typeof totalCount === "function") {
        state.fuzi.totalCount = totalCount(state.fuzi.totalCount);
      } else {
        state.fuzi.totalCount = totalCount;
      }
    });
  },
  setFuzi(index: number, part: Partial<Fuzi>) {
    set((state) => {
      const fuzi = state.fuzi.fuziCards[index];
      if (fuzi) {
        state.fuzi.fuziCards[index] = { ...fuzi, ...part };
      }
    });
  },
  setCountNoFind(countNoFind: number) {
    set((state) => {
      state.fuzi.countNoFind = countNoFind;
    });
  },
  addCountNoFind() {
    set((state) => {
      state.fuzi.countNoFind += 1;
    });
  },
  decreaseCountNoFind() {
    set((state) => {
      state.fuzi.countNoFind -= 1;
    });
  },
  setRemainingTime(remainingTime: number) {
    set((state) => {
      state.fuzi.remainingTime = remainingTime;
    });
  },
  setSpeededTime(speededTime: number) {
    set((state) => {
      state.fuzi.speededTime = speededTime;
    });
  },
  setOvertime(time: number | ((prevTime: number) => number)) {
    set((state) => {
      if (typeof time === "function") {
        state.fuzi.overtime = time(state.fuzi.overtime);
      } else {
        state.fuzi.overtime = time;
      }
    });
  },
  setTimePenalty(time: number | ((prevTime: number) => number)) {
    set((state) => {
      if (typeof time === "function") {
        state.fuzi.timePenalty = time(state.fuzi.timePenalty);
      } else {
        state.fuzi.timePenalty = time;
      }
    });
  },
  decreaseRemainingTime(interval: number) {
    set((state) => {
      if (state.fuzi.remainingTime > 0) {
        state.fuzi.remainingTime -= interval;
      }
      if (state.fuzi.remainingTime <= 0) {
        state.fuzi.remainingTime = 0;
      }
    });
  },
  setGameResult(gameResult: GameResultEnum) {
    set((state) => {
      state.fuzi.gameResult = gameResult;
    });
  },
  setFuziCards(fuziCards: Fuzi[]) {
    set((state) => {
      state.fuzi.fuziCards = fuziCards;
    });
  },
});

export default createFuziStore;
