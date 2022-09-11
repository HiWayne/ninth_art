import { FenceWidth } from "@/pages/Restaurant/constant";
import { DisplayObject } from "pixi.js";
import { MutableRefObject, useCallback, useRef, useState } from "react";

export const useDrag = ({ x, y } = { x: 0, y: 0 }) => {
  const sprite: MutableRefObject<DisplayObject> = useRef(null as any);
  const prevPosition: MutableRefObject<{ x: number; y: number }> = useRef(
    null as any
  );
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });

  const onDown = useCallback((e) => {
    e.stopPropagation();
    setIsDragging(true);
    if (sprite.current) {
      prevPosition.current = e.data.getLocalPosition(sprite.current.parent);
    }
  }, []);
  const onUp = useCallback((e) => {
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const onMove = useCallback(
    (e) => {
      // e.stopPropagation();
      if (isDragging && sprite.current) {
        const currentPosition = e.data.getLocalPosition(sprite.current.parent);
        const offsetX = currentPosition.x - prevPosition.current.x;
        const offsetY = currentPosition.y - prevPosition.current.y;
        let gridXCount = 0;
        let gridYCount = 0;
        if (Math.floor(Math.abs(offsetX / FenceWidth)) > 0) {
          gridXCount =
            offsetX > 0
              ? Math.floor(Math.abs(offsetX / FenceWidth))
              : -Math.floor(Math.abs(offsetX / FenceWidth));
        }
        if (Math.floor(Math.abs(offsetY / FenceWidth)) > 0) {
          gridYCount =
            offsetY > 0
              ? Math.floor(Math.abs(offsetY / FenceWidth))
              : -Math.floor(Math.abs(offsetY / FenceWidth));
        }
        if (gridXCount || gridYCount) {
          prevPosition.current.x = currentPosition.x;
          prevPosition.current.y = currentPosition.y;
          setPosition({
            x: position.x + gridXCount * FenceWidth,
            y: position.y + gridYCount * FenceWidth,
          });
        }
      }
    },
    [isDragging, setPosition, position]
  );

  return {
    setPosition: setPosition,
    binding: {
      ref: sprite,
      interactive: true,
      pointerdown: onDown,
      pointerup: onUp,
      pointerupoutside: onUp,
      pointermove: onMove,
      anchor: 0.5,
      position,
    },
  };
};
