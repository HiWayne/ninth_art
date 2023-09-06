export interface ZhaoBuTongStore {
  currentLevel: number;
  helpPropsCount: number;
  timePropsCount: number;
  shaking: boolean;
  totalStars: number;
  setShaking: (shaking: boolean) => void;
  setHelpPropsCount: (count: number) => void;
  setTimePropsCount: (count: number) => void;
  setCurrentLevel: (index: number) => void;
  setTotalStars: (stars: number) => void;
}

export const REMAINING_TIME = 120000; // 毫秒

export const SAVED_LEVEL = "SAVED_LEVEL";
export const SAVED_LEVELS_SCORE = "SAVED_LEVELS_SCORE";
export const SAVED_PROPS = "SAVED_PROPS";
export const SAVED_TOTAL_STARS = "SAVED_TOTAL_STARS";

const currentLevel = window.localStorage.getItem(SAVED_LEVEL) || "0";
// 游戏道具
export let savedProps: { helpProps: number; timeProps: number };
try {
  savedProps = JSON.parse(window.localStorage.getItem(SAVED_PROPS) || "");
} catch {
  savedProps = { helpProps: 0, timeProps: 0 };
}
const savedTotalStars = window.localStorage.getItem(SAVED_TOTAL_STARS) || `0`;

export let savedLevelsScoreRef: {
  current: Record<
    number,
    {
      level: number;
      score: number | null;
      remainingTime: number;
      speedTime: number | null;
      minSpeedTime: number | null;
      recordDate: number | null;
      gotProp: boolean;
    }
  >;
} = { current: {} };
try {
  savedLevelsScoreRef.current = JSON.parse(
    window.localStorage.getItem(SAVED_LEVELS_SCORE) || ""
  );
} catch {
  savedLevelsScoreRef.current = {
    0: {
      level: 0,
      score: null,
      remainingTime: REMAINING_TIME,
      speedTime: null,
      minSpeedTime: null,
      recordDate: null,
      gotProp: false,
    },
  };
}

const createZhaoBuTongStore: (
  set: (
    nextStateOrUpdater: object | ((state: ZhaoBuTongStore) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => ZhaoBuTongStore = (set) => ({
  currentLevel: parseInt(currentLevel),
  helpPropsCount: savedProps.helpProps,
  timePropsCount: savedProps.timeProps,
  shaking: false,
  totalStars: parseInt(savedTotalStars),
  setShaking(shaking) {
    set((state) => {
      state.shaking = shaking;
    });
  },
  setHelpPropsCount(count) {
    set((state) => {
      state.helpPropsCount = count;
    });
  },
  setTimePropsCount(count) {
    set((state) => {
      state.timePropsCount = count;
    });
  },
  setCurrentLevel(index) {
    set((state) => {
      state.currentLevel = index;
    });
  },
  setTotalStars(stars) {
    set((state) => {
      state.totalStars = stars;
    });
  },
});

export default createZhaoBuTongStore;

// 0-要找的字、1-多数的字
export const charList: string[][] = [
  ["体", "休"],
  ["犬", "大"],
  ["已", "己"],
  ["木", "本"],
  ["太", "大"],
  ["天", "夫"],
  ["俺", "掩"],
  ["扬", "杨"],
  ["洋", "详"],
  ["谣", "摇"],
  ["辩", "辨"],
  ["売", "壳"],
  ["団", "团"],
  ["挙", "举"],
  ["圧", "压"],
  ["抜", "拔"],
  ["汚", "污"],
  ["涼", "凉"],
  ["収", "收"],
  ["歩", "步"],
  ["呂", "吕"],
  ["荼", "茶"],
  ["孓", "孑"],
  ["匸", "匚"],
  ["釆", "采"],
  ["妹", "妺"],
  ["氽", "汆"],
  ["睢", "雎"],
  ["戍", "戊"],
  ["巿", "市"],
  ["祗", "祇"],
  ["骛", "鹜"],
  ["浇", "绕"],
  ["壵", "垚"],
  ["姫", "姬"],
  ["毫", "亳"],
  ["袆", "祎"],
  ["壸", "壶"],
  ["袑", "祒"],
  ["洗", "冼"],
  ["夊", "夂"],
  ["乓", "乒"],
  ["芺", "芙"],
  ["嫐", "嬲"],
  ["掱", "毳"],
  ["帀", "币"],
  ["褔", "福"],
  ["萭", "萬"],
  ["汨", "汩"],
  ["麈", "塵"],
];
