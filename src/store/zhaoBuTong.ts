export interface ZhaoBuTongStore {
  currentChars: string[];
  currentIndex: number;
  shaking: boolean;
  setShaking: (shaking: boolean) => void;
  setCurrentChar: (chars: string[]) => void;
  setCurrentIndex: (index: number) => void;
}

const createZhaoBuTongStore: (
  set: (
    nextStateOrUpdater: object | ((state: any) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => ZhaoBuTongStore = (set) => ({
  currentChars: charList[0],
  currentIndex: 0,
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
  setCurrentIndex(index) {
    set((state) => {
      state.zhaoBuTong.currentIndex = index;
    });
  },
});

export default createZhaoBuTongStore;

// 0-要找的字、1-多数的字
export const charList: string[][] = [["已", "己"], ["犬", "大"]];
