import { Fuzi, GameResultEnum } from "@/pages/FuziGame/shared/types";

export type TotalNeedFindingComputer = (totalNeedFinding: number) => number;

export interface FuziStore {
  totalNeedFinding: number;
  countNoFind: number;
  remainingTime: number;
  speededTime: number;
  overtime: number;
  timePenalty: number;
  gameResult: GameResultEnum;
  fuziCards: Fuzi[];
  shaking: boolean;
  setShaking: (shaking: boolean) => void;
  setTotalNeedFinding: (
    totalNeedFinding: number | TotalNeedFindingComputer
  ) => void;
  setFuzi: (index: number, part: Partial<Fuzi>) => void;
  setCountNoFind: (countNoFind: number) => void;
  addCountNoFind: () => void;
  decreaseCountNoFind: () => void;
  setRemainingTime: (remainingTime: number) => void;
  setSpeededTime: (speededTime: number) => void;
  setOvertime: (time: number | ((prevTime: number) => number)) => void;
  setTimePenalty: (time: number | ((prevTime: number) => number)) => void;
  addRemainingTime: (interval: number) => void;
  decreaseRemainingTime: (interval: number) => void;
  setGameResult: (gameResult: GameResultEnum) => void;
  setFuziCards: (fuziCards: Fuzi[]) => void;
}

export interface GameSettingsType {
  // 时间限制, 秒
  timeLimit?: number;
  // 福字总数
  totalNumber?: number;
  // 寻找的数量
  findingNumber?: number;
  // buff的比例
  buffPercent?: number;
  // debuff的比例
  debuffPercent?: number;
}

export const GAME_SETTINGS = "GAME_SETTINGS";
export const TIME_LIMIT = "time_limit";
export const TOTAL_NUMBER = "total_number";
export const FINDING_NUMBER = "finding_number";
export const BUFF_PERCENT = "buff_percent";
export const DEBUFF_PERCENT = "debuff_percent";

export let savedGameSettings: GameSettingsType = {};

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has(TIME_LIMIT)) {
  savedGameSettings.timeLimit = parseFloat(urlParams.get(TIME_LIMIT)!);
}
if (urlParams.has(TOTAL_NUMBER)) {
  savedGameSettings.totalNumber = parseInt(urlParams.get(TOTAL_NUMBER)!);
}
if (urlParams.has(FINDING_NUMBER)) {
  savedGameSettings.findingNumber = parseInt(urlParams.get(FINDING_NUMBER)!);
}
if (urlParams.has(BUFF_PERCENT)) {
  savedGameSettings.buffPercent = parseFloat(urlParams.get(BUFF_PERCENT)!);
}
if (urlParams.has(DEBUFF_PERCENT)) {
  savedGameSettings.debuffPercent = parseFloat(urlParams.get(DEBUFF_PERCENT)!);
}

if (
  !urlParams.has(TIME_LIMIT) &&
  !urlParams.has(TOTAL_NUMBER) &&
  !urlParams.has(FINDING_NUMBER) &&
  !urlParams.has(BUFF_PERCENT) &&
  !urlParams.has(DEBUFF_PERCENT)
) {
  try {
    savedGameSettings = JSON.parse(
      window.localStorage.getItem(GAME_SETTINGS) || ""
    );
  } catch {
    void 0;
  }
}

// 给gameSettings默认值
export const formatGameSettings = (settings: GameSettingsType) => {
  const data = { ...settings };
  if (!data.timeLimit) {
    data.timeLimit = 10;
  }
  if (!data.totalNumber) {
    data.totalNumber = 50;
  }
  if (!data.buffPercent && data.buffPercent !== 0) {
    data.buffPercent = 100;
  }
  if (!data.debuffPercent && data.debuffPercent !== 0) {
    data.debuffPercent = 100;
  }
  return data;
};

savedGameSettings = formatGameSettings(savedGameSettings);

const createFuziStore: (
  set: (
    nextStateOrUpdater: object | ((state: any) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => FuziStore = (set) => ({
  totalNeedFinding: 0,
  countNoFind: 0,
  remainingTime: savedGameSettings.timeLimit! * 1000,
  // 实际花费的时间
  speededTime: 0,
  // 加时
  overtime: 0,
  // 罚时
  timePenalty: 0,
  // 0 - 进行中, 1 - 胜利, 2 - 失败
  gameResult: 0,
  fuziCards: [],
  shaking: false,
  setShaking(shaking) {
    set((state) => {
      state.fuzi.shaking = shaking;
    });
  },
  setTotalNeedFinding(totalNeedFinding: number | TotalNeedFindingComputer) {
    set((state) => {
      if (typeof totalNeedFinding === "function") {
        state.fuzi.totalNeedFinding = totalNeedFinding(
          state.fuzi.totalNeedFinding
        );
      } else {
        state.fuzi.totalNeedFinding = totalNeedFinding;
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
  addRemainingTime(interval: number) {
    set((state) => {
      if (state.fuzi.remainingTime > 0) {
        state.fuzi.remainingTime += interval;
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
