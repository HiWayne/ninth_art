export interface ZhaoBuTongStore {
  currentChars: string[];
  currentLevel: number;
  shaking: boolean;
  setShaking: (shaking: boolean) => void;
  setCurrentChar: (chars: string[]) => void;
  setCurrentLevel: (index: number) => void;
}

export const SAVED_LEVEL = "SAVED_LEVEL";
export const SAVED_LEVELS_SCORE = "SAVED_LEVELS_SCORE";
export const SAVED_PROPS = "SAVED_PROPS";

const currentLevel = window.localStorage.getItem(SAVED_LEVEL) || "0";

const createZhaoBuTongStore: (
  set: (
    nextStateOrUpdater: object | ((state: any) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => ZhaoBuTongStore = (set) => ({
  currentChars: charList[0],
  currentLevel: parseInt(currentLevel),
  shaking: false,
  setShaking(shaking) {
    set((state) => {
      state.zhaoBuTong.shaking = shaking;
    });
  },
  setCurrentChar(char) {
    set((state) => {
      state.zhaoBuTong.currentChars = char;
    });
  },
  setCurrentLevel(index) {
    set((state) => {
      state.zhaoBuTong.currentLevel = index;
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
