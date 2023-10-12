import { TouchEventHandler, useCallback, useRef } from "react";
import shallow from "zustand/shallow";
import useStore from "@/store";

export const useBrush = () => {
  const isDrawingRef = useRef(false);

  const {
    segBrushLineWidth,
    segBrushLineColor,
    history,
    addHistory,
    setHistory,
    currentHistoryIndex,
  } = useStore(
    (state) => ({
      segBrushLineWidth: state.fineDrawing.segBrushLineWidth,
      segBrushLineColor: state.fineDrawing.segBrushLineColor,
      history: state.fineDrawing.history,
      addHistory: state.fineDrawing.addHistory,
      setHistory: state.fineDrawing.setHistory,
      currentHistoryIndex: state.fineDrawing.currentHistoryIndex,
    }),
    shallow
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      line: {
        lineWidth: number;
        lineColor: string;
        points: { x: number; y: number }[];
      },
      action?: "POINTER_UP"
    ) => {
      const { points, lineWidth, lineColor } = line;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.lineCap = "round";
      if (points.length === 1) {
        const x = points[0].x;
        const y = points[0].y;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
      }
      //   else if (points.length === 2) {
      //     if (!action) {
      //       const x =
      //         (points[points.length - 2].x + points[points.length - 1].x) / 2;
      //       const y =
      //         (points[points.length - 2].y + points[points.length - 1].y) / 2;
      //       ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
      //       ctx.lineTo(x, y);
      //     } else if (action === "POINTER_UP") {
      //       // 相当于只画了一个点
      //       ctx.arc(points[0].x, points[0].y, lineWidth / 2, 0, 2 * Math.PI);
      //     }
      //   } else if (points.length >= 3) {
      //     for (let i = 3; i < points.length; i++) {
      //       const x = (points[i - 2].x + points[i - 1].x) / 2;
      //       const y = (points[i - 2].y + points[i - 1].y) / 2;

      //       const lastX = (points[i - 3].x + points[i - 2].x) / 2;
      //       const lastY = (points[i - 3].y + points[i - 2].y) / 2;
      //       ctx.moveTo(lastX, lastY);
      //       if (i < points.length - 1 || !action) {
      //         ctx.quadraticCurveTo(points[i - 2].x, points[i - 2].y, x, y);
      //       } else if (action === "POINTER_UP") {
      //         ctx.quadraticCurveTo(
      //           points[i - 2].x,
      //           points[i - 2].y,
      //           points[i - 1].x,
      //           points[i - 1].y
      //         );
      //       }
      //     }
      //   }
      else if (points.length >= 2) {
        for (let i = 1; i < points.length; i++) {
          const lastX = points[i - 1].x;
          const lastY = points[i - 1].y;
          const x = points[i].x;
          const y = points[i].y;
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    },
    []
  );

  const onPointerDown = useCallback<TouchEventHandler<HTMLCanvasElement>>(
    (e) => {
      isDrawingRef.current = true;
      const { top, left } = (
        e.target as HTMLCanvasElement
      ).getBoundingClientRect();
      const x = e.touches[0].clientX - left;
      const y = e.touches[0].clientY - top;
      if (!history[currentHistoryIndex]?.segBrushLinesList) {
        addHistory({
          segBrushLinesList: [
            {
              lineWidth: segBrushLineWidth,
              lineColor: segBrushLineColor,
              points: [{ x, y }],
            },
          ],
        });
      } else {
        addHistory((lastHistory) => {
          if (!Array.isArray(lastHistory.segBrushLinesList)) {
            lastHistory.segBrushLinesList = [];
          }
          lastHistory.segBrushLinesList.push({
            lineWidth: segBrushLineWidth,
            lineColor: segBrushLineColor,
            points: [{ x, y }],
          });
        });
      }
    },
    [
      segBrushLineWidth,
      segBrushLineColor,
      history[currentHistoryIndex]?.segBrushLinesList,
    ]
  );

  const onPointerMove = useCallback<TouchEventHandler<HTMLCanvasElement>>(
    (e) => {
      console.log("move");
      const { top, left } = (
        e.target as HTMLCanvasElement
      ).getBoundingClientRect();
      console.log(e);
      const x = e.touches[0].clientX - left;
      const y = e.touches[0].clientY - top;
      if (isDrawingRef.current) {
        setHistory((history, currentHistoryIndex) => {
          const segBrushLinesList =
            history[currentHistoryIndex].segBrushLinesList;
          if (segBrushLinesList) {
            segBrushLinesList[segBrushLinesList.length - 1].points.push({
              x,
              y,
            });
          }
        });
      }
    },
    []
  );

  const onPointerUp = useCallback<TouchEventHandler<HTMLCanvasElement>>((e) => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
    }
  }, []);

  return {
    isBrushDrawingRef: isDrawingRef,
    brushDraw: draw,
    onBrushPointerDown: onPointerDown,
    onBrushPointerMove: onPointerMove,
    onBrushPointerUp: onPointerUp,
  };
};
