import {
  CSSProperties,
  FC,
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import shallow from "zustand/shallow";
import { Form, InputNumber, Slider } from "antd";
import { RedoOutlined, UndoOutlined } from "@ant-design/icons";
import useStore from "store/index";
import { colorList } from "store/fineDrawing";
import { useBrush, useEraser } from "./hooks";
import throttling from "./utils/throttling";
import brushIcon from "./brush.svg";
import eraserIcon from "./eraser.svg";

const Dot: FC<{
  size: number;
  color?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}> = ({ size, color = "#000", onClick, style = {} }) => {
  return (
    <div
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
      }}
      className="inline-block rounded-[50%]"
      onClick={onClick}
    ></div>
  );
};

const Canvas = () => {
  const {
    currentTool,
    setCurrentTool,
    segBrushLineWidth,
    setSegBrushLineWidth,
    segBrushLineColor,
    setSegBrushLineColor,
    segEraserLineWidth,
    setSegEraserLineWidth,
    selectedDotIndex,
    setSelectedDotIndex,
    history,
    backHistory,
    forwardHistory,
    currentHistoryIndex,
  } = useStore(
    (state) => ({
      currentTool: state.fineDrawing.currentTool,
      setCurrentTool: state.fineDrawing.setCurrentTool,
      segBrushLineWidth: state.fineDrawing.segBrushLineWidth,
      setSegBrushLineWidth: state.fineDrawing.setSegBrushLineWidth,
      segBrushLineColor: state.fineDrawing.segBrushLineColor,
      setSegBrushLineColor: state.fineDrawing.setSegBrushLineColor,
      segEraserLineWidth: state.fineDrawing.segEraserLineWidth,
      setSegEraserLineWidth: state.fineDrawing.setSegEraserLineWidth,
      selectedDotIndex: state.fineDrawing.selectedDotIndex,
      setSelectedDotIndex: state.fineDrawing.setSelectedDotIndex,
      history: state.fineDrawing.history,
      backHistory: state.fineDrawing.backHistory,
      forwardHistory: state.fineDrawing.forwardHistory,
      currentHistoryIndex: state.fineDrawing.currentHistoryIndex,
    }),
    shallow
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    onBrushPointerDown,
    onBrushPointerMove,
    onBrushPointerUp,
    isBrushDrawingRef,
    brushDraw,
  } = useBrush();

  const {
    onEraserPointerDown,
    onEraserPointerMove,
    onEraserPointerUp,
    isEraserWorkingRef,
    eraserDraw,
  } = useEraser();

  const onPointerDown = useCallback<PointerEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (currentTool === "BRUSH") {
        onBrushPointerDown(e);
      } else if (currentTool === "ERASER") {
        onEraserPointerDown(e);
      }
    },
    [currentTool, onBrushPointerDown, onEraserPointerDown]
  );

  const onPointerMove = useMemo<PointerEventHandler<HTMLCanvasElement>>(
    () =>
      throttling<PointerEventHandler<HTMLCanvasElement>>((e) => {
        if (currentTool === "BRUSH") {
          onBrushPointerMove(e);
        } else if (currentTool === "ERASER") {
          onEraserPointerMove(e);
        }
      }),
    [currentTool, onBrushPointerMove, onEraserPointerMove]
  );

  const onPointerUp = useCallback<PointerEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (currentTool === "BRUSH") {
        onBrushPointerUp(e);
      } else if (currentTool === "ERASER") {
        onEraserPointerUp(e);
      }
    },
    [currentTool, onBrushPointerUp, onEraserPointerUp]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const segBrushLinesList = history[currentHistoryIndex]?.segBrushLinesList;
      const segEraserLinesList =
        history[currentHistoryIndex]?.segEraserLinesList;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (Array.isArray(segBrushLinesList)) {
          segBrushLinesList.forEach((segLine, index) => {
            // 没有isDrawingRef.current说明是PointerUp触发的历史变化
            brushDraw(
              ctx,
              segLine,
              index === segBrushLinesList.length - 1 &&
                isBrushDrawingRef.current
                ? undefined
                : "POINTER_UP"
            );
          });
        }
        if (Array.isArray(segEraserLinesList)) {
          segEraserLinesList.forEach((segLine, index) => {
            // 没有isDrawingRef.current说明是PointerUp触发的历史变化
            eraserDraw(
              ctx,
              segLine,
              index === segEraserLinesList.length - 1 &&
                isEraserWorkingRef.current
                ? undefined
                : "POINTER_UP"
            );
          });
        }
      }
    }
  }, [
    history[currentHistoryIndex]?.segBrushLinesList,
    history[currentHistoryIndex]?.segEraserLinesList,
  ]);

  useEffect(() => {
    if (currentTool) {
      document.body.style.cursor = `url(${
        currentTool === "BRUSH" ? brushIcon : eraserIcon
      }) 8 27, auto`;
      return () => {
        document.body.style.cursor = "";
      };
    }
  }, [currentTool, segBrushLineWidth, segEraserLineWidth]);

  return (
    <div className="flex justify-between items-center select-none">
      <canvas
        className="w-[1000px] h-[100vh] border-[1px] border-solid border-[#eee]"
        width={1000}
        height={window.innerHeight}
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <div className="p-[12px] w-[400px]">
        <Form>
          <Form.Item label="历史记录">
            <div>
              <UndoOutlined
                style={
                  currentHistoryIndex === -1
                    ? { color: "rgba(0, 0, 0, 0.25)", cursor: "not-allowed" }
                    : undefined
                }
                className="ml-[12px] text-[24px] cursor-pointer"
                onClick={
                  currentHistoryIndex === -1
                    ? undefined
                    : () => {
                        backHistory();
                      }
                }
                rev
              />
              <RedoOutlined
                style={
                  currentHistoryIndex >= history.length - 1
                    ? { color: "rgba(0, 0, 0, 0.25)", cursor: "not-allowed" }
                    : undefined
                }
                className="ml-[12px] text-[24px] cursor-pointer"
                onClick={
                  currentHistoryIndex >= history.length - 1
                    ? undefined
                    : () => {
                        forwardHistory();
                      }
                }
                rev
              />
            </div>
          </Form.Item>
          <Form.Item className="mt-[48px]" label="笔刷粗细">
            <div className="flex justify-center items-center">
              <Dot size={8} color="#8ee89e" style={{ marginRight: "8px" }} />
              <Slider
                className="w-[160px]"
                min={1}
                max={60}
                step={1}
                onChange={setSegBrushLineWidth}
                value={segBrushLineWidth}
              />
              <Dot size={16} color="#8ee89e" style={{ marginLeft: "8px" }} />
              <InputNumber
                className="ml-[8px]"
                value={segBrushLineWidth}
                min={1}
                max={60}
                step={1}
                onChange={(value) => {
                  if (value !== null) {
                    setSegBrushLineWidth(value);
                  }
                }}
              />
            </div>
          </Form.Item>
          <Form.Item className="mt-[24px]" label="笔刷颜色">
            <div className="mt-[-8px] ml-[-8px] flex flex-wrap justify-start items-center">
              {colorList.map((color, index) => (
                <Dot
                  key={color}
                  size={36}
                  color={color}
                  style={{
                    margin: "8px 0 0 8px",
                    border:
                      currentTool === "BRUSH" && index === selectedDotIndex
                        ? "1px solid #ccc"
                        : "1px solid #eee",
                    boxShadow:
                      currentTool === "BRUSH" && index === selectedDotIndex
                        ? `0 0 4px ${color}`
                        : undefined,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrentTool("BRUSH");
                    setSelectedDotIndex(index);
                    setSegBrushLineColor(color);
                  }}
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item className="mt-[48px]" label="橡皮擦">
            <div className="flex justify-start items-center">
              <div
                className="p-[8px] hover:bg-[#f7f7f7] rounded-[8px]"
                style={
                  currentTool === "ERASER"
                    ? { background: "#f1efe4" }
                    : undefined
                }
                onClick={() => {
                  if (currentTool !== "ERASER") {
                    setCurrentTool("ERASER");
                  } else {
                    setCurrentTool("");
                  }
                }}
              >
                <img src={eraserIcon} className="cursor-pointer" />
              </div>
            </div>
          </Form.Item>
          <Form.Item className="mt-[24px]" label="橡皮擦大小">
            <div className="flex justify-center items-center">
              <Dot size={8} color="#8ee89e" style={{ marginRight: "8px" }} />
              <Slider
                className="w-[160px]"
                min={1}
                max={40}
                step={1}
                onChange={setSegEraserLineWidth}
                value={segEraserLineWidth}
              />
              <Dot size={16} color="#8ee89e" style={{ marginLeft: "8px" }} />
              <InputNumber
                className="ml-[8px]"
                value={segEraserLineWidth}
                min={1}
                max={40}
                step={1}
                onChange={(value) => {
                  if (value !== null) {
                    setSegEraserLineWidth(value);
                  }
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Canvas;
