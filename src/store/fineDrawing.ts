import { produce } from "immer";

export const colorList = [
  "#000000",
  "#C7EDCC",
  "#f56c6c",
  "#ef5b9c",
  "#ed1941",
  "#f05b72",
  "#f15a22",
  "#f3704b",
  "#ffd400",
  "#f47920",
  "#45b97c",
  "#228fbd",
  "#6950a1",
  "#6f60aa",
  "#fffef9",
  "#d1c7b7",
  "#f2eada",
  "#d3d7d4",
  "#a1a3a6",
  "#9d9087",
  "#77787b",
  "#563624",
  "#c77eb5",
  "#8552a1",
  "#00ae9d",
  "#65c294",
  "#009ad6",
  "#90d7ec",
  "#33a3dc",
  "#7fb80e",
  "#FAF9DE",
  "#FFF2E2",
  "#FDE6E0",
  "#E3EDCD",
  "#DCE2F1",
  "#E9EBFE",
  "#EAEAEF",
  "#B7E8BD",
  "#CCE8CF",
];

interface DrawingHistory {
  segBrushLinesList?: {
    lineWidth: number;
    lineColor: string;
    points: { x: number; y: number }[];
  }[];
  segEraserLinesList?: {
    lineWidth: number;
    points: { x: number; y: number }[];
  }[];
}

export type ToolType = "BRUSH" | "ERASER" | "";

export interface FineDrawingStore {
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
  currentHistoryIndex: number;
  setCurrentHistoryIndex: (index: number) => void;
  history: DrawingHistory[];
  addHistory: (
    history: Partial<DrawingHistory> | ((lastHistory: DrawingHistory) => void)
  ) => void;
  removeHistory: (index?: number) => void;
  forwardHistory: (step?: number) => void;
  backHistory: (step?: number) => void;
  clearHistory: () => void;
  setHistory: (
    history:
      | DrawingHistory[]
      | ((history: DrawingHistory[], currentHistoryIndex: number) => void)
  ) => void;
  segBrushLineWidth: number;
  setSegBrushLineWidth: (width: number) => void;
  segBrushLineColor: string;
  setSegBrushLineColor: (color: string) => void;
  segEraserLineWidth: number;
  setSegEraserLineWidth: (width: number) => void;
  selectedDotIndex: number;
  setSelectedDotIndex: (index: number) => void;
}

export const createFineDrawingStore: (
  set: (
    nextStateOrUpdater: object | ((state: FineDrawingStore) => void),
    shouldReplace?: boolean | undefined
  ) => void
) => FineDrawingStore = (set) => ({
  currentTool: "BRUSH",
  setCurrentTool(tool) {
    set((state) => {
      state.currentTool = tool;
    });
  },
  currentHistoryIndex: -1,
  setCurrentHistoryIndex(index) {
    set((state) => {
      state.currentHistoryIndex = index;
    });
  },
  history: [],
  addHistory(history) {
    set((state) => {
      const lastHistory = state.history[state.currentHistoryIndex] || {};
      if (state.currentHistoryIndex !== state.history.length - 1) {
        state.history.push(
          ...JSON.parse(
            JSON.stringify(
              state.history
                .slice(state.currentHistoryIndex, state.history.length - 1)
                .reverse()
            )
          )
        );
      }
      if (typeof history !== "function") {
        state.history.push({ ...lastHistory, ...history });
      } else {
        state.history.push({
          ...lastHistory,
          ...produce(lastHistory, history),
        });
      }
      state.currentHistoryIndex = state.history.length - 1;
    });
  },
  removeHistory(index) {
    set((state) => {
      if (typeof index === "number") {
        state.history.splice(index, 1);
      } else if (state.history.length > 0 && state.currentHistoryIndex >= 0) {
        state.history.splice(state.currentHistoryIndex, 1);
        state.currentHistoryIndex--;
      }
    });
  },
  forwardHistory(step) {
    set((state) => {
      if (
        state.history.length > 0 &&
        state.currentHistoryIndex < state.history.length - 1
      ) {
        if (typeof step === "number") {
          state.currentHistoryIndex += step;
        } else {
          state.currentHistoryIndex++;
        }
      }
    });
  },
  backHistory(step) {
    set((state) => {
      if (state.currentHistoryIndex > -1) {
        if (typeof step === "number") {
          if (state.currentHistoryIndex - step < -1) {
            state.currentHistoryIndex = -1;
          } else {
            state.currentHistoryIndex -= step;
          }
        } else {
          state.currentHistoryIndex--;
        }
      }
    });
  },
  clearHistory() {
    set((state) => {
      state.history = [];
      state.currentHistoryIndex = -1;
    });
  },
  setHistory(history) {
    set((state) => {
      if (typeof history !== "function") {
        state.history = history;
      } else {
        history(state.history, state.currentHistoryIndex);
      }
    });
  },
  segBrushLineWidth: 5,
  setSegBrushLineWidth(width) {
    set((state) => {
      state.segBrushLineWidth = width;
    });
  },
  segEraserLineWidth: 5,
  setSegEraserLineWidth(width) {
    set((state) => {
      state.segEraserLineWidth = width;
    });
  },
  segBrushLineColor: colorList[0],
  setSegBrushLineColor(color) {
    set((state) => {
      state.segBrushLineColor = color;
    });
  },
  selectedDotIndex: 0,
  setSelectedDotIndex(index) {
    set((state) => {
      state.selectedDotIndex = index;
    });
  },
});
