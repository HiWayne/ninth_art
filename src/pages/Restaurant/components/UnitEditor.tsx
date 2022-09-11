import { useDrag } from "@/shared/hooks";
import { Graphics, Sprite } from "@inlet/react-pixi";
import type { Graphics as GraphicsType } from "pixi.js";
import { FC, forwardRef, useCallback, useState } from "react";
import {
  cancelIconWidth,
  confirmIconWidth,
  DiningTableAndSeatsComposeDiningTableOffsetY,
  DiningTableAndSeatsComposeRightSeatOffsetX,
  DiningTableHeight,
  ToRightOrLeftSeatHeight,
  ToRightOrLeftSeatWidth,
} from "../constant";
import cancelIcon from "../assets/images/icon/cancel.svg";
import confirmIcon from "../assets/images/icon/confirm.svg";
import useStore from "@/store";
import shallow from "zustand/shallow";

const createDraw = () => (g: GraphicsType) => {
  g.clear();
  g.beginFill(0x000000, 0.2);
  g.drawRect(
    0,
    0,
    ToRightOrLeftSeatWidth + DiningTableAndSeatsComposeRightSeatOffsetX,
    ToRightOrLeftSeatHeight +
      (DiningTableAndSeatsComposeDiningTableOffsetY -
        (ToRightOrLeftSeatHeight - DiningTableHeight))
  );
};

interface OperateIconProps {
  x: number;
  y: number;
  onClick: () => void;
}

const Cancel: FC<OperateIconProps> = ({ x, y, onClick }) => (
  <Sprite
    x={x}
    y={y}
    width={cancelIconWidth}
    height={cancelIconWidth}
    image={cancelIcon}
    pointerdown={onClick}
    interactive={true}
  />
);

const Confirm: FC<OperateIconProps> = ({ x, y, onClick }) => (
  <Sprite
    x={x}
    y={y}
    width={confirmIconWidth}
    height={confirmIconWidth}
    image={confirmIcon}
    pointerdown={onClick}
    interactive={true}
  />
);

const Mask = forwardRef<
  GraphicsType,
  {
    x: number;
    y: number;
    handleConfirm: () => void;
    handleCancel: () => void;
    [key: string]: any;
  }
>(({ x, y, handleConfirm, handleCancel, ...props }, ref) => {
  return (
    <>
      <Graphics draw={createDraw()} ref={ref} {...props} />
      <Cancel
        x={
          x +
          (ToRightOrLeftSeatWidth +
            DiningTableAndSeatsComposeRightSeatOffsetX -
            (cancelIconWidth + confirmIconWidth + 10)) /
            2
        }
        y={y - cancelIconWidth}
        onClick={handleCancel}
      />
      <Confirm
        x={
          x +
          (ToRightOrLeftSeatWidth +
            DiningTableAndSeatsComposeRightSeatOffsetX -
            (cancelIconWidth + confirmIconWidth + 10)) /
            2 +
          cancelIconWidth +
          10
        }
        y={y - confirmIconWidth}
        onClick={handleConfirm}
      />
    </>
  );
});

interface UnitEditorProps {
  x: number;
  y: number;
  render: FC<{ x: number; y: number; [key: string]: any }>;
  canEdit: boolean;
  handleEntity: (data: { x: number; y: number }) => void;
}

export const UnitEditor: FC<UnitEditorProps> = ({
  x: initialX,
  y: initialY,
  render: Render,
  canEdit,
  handleEntity,
}) => {
  const [isEditing, setIsEditing] = useStore(
    (state) => [state.restaurant.isEditing, state.restaurant.setIsEditing],
    shallow
  );

  const [show, setShow] = useState(false);
  const { setPosition, binding: dragBind } = useDrag({
    x: initialX,
    y: initialY,
  });

  const showEditor = useCallback(() => {
    if (isEditing) {
      return;
    }
    setIsEditing(true);
    setShow(true);
  }, [isEditing]);

  const hideEditor = useCallback(() => {
    setIsEditing(false);
    setShow(false);
  }, []);

  const resetPosition = useCallback(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handleCancel = useCallback(() => {
    resetPosition();
    hideEditor();
  }, [resetPosition, hideEditor]);

  const handleConfirm = useCallback(() => {
    if (typeof handleEntity === "function") {
      handleEntity({ x: dragBind.position.x, y: dragBind.position.y });
    }
    hideEditor();
  }, [handleEntity, hideEditor]);

  return canEdit ? (
    <>
      <Render
        x={dragBind.position.x}
        y={dragBind.position.y}
        onClick={showEditor}
      />
      {show ? (
        <Mask
          x={dragBind.position.x}
          y={dragBind.position.y}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          {...dragBind}
        />
      ) : null}
    </>
  ) : (
    <Render x={dragBind.position.x} y={dragBind.position.y} />
  );
};
