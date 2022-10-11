// 以iphone 12 pro、iphone xr为基准
const baseRatio = 896 / 414;
const ratio = window.innerHeight / window.innerWidth;
const baseHeight = window.innerWidth * baseRatio;
const baseFenceWidth = window.innerWidth * 0.05;

export const FenceWidth = Math.floor(
  ratio < baseRatio
    ? baseFenceWidth * (1 - (baseHeight - window.innerHeight) / baseHeight)
    : baseFenceWidth
);

export const DiningTableWidth = 134 / 3.5;
export const DiningTableHeight = 87 / 3.5;
export const ToRightOrLeftSeatWidth = 31 / 2.5;
export const ToRightOrLeftSeatHeight = 76 / 2.5;
export const DiningTableAndSeatsComposeRightSeatOffsetX = 56;
export const DiningTableAndSeatsComposeDiningTableOffsetX = 15;
export const DiningTableAndSeatsComposeDiningTableOffsetY = 8;

export const CancelIconWidth = 20;
export const ConfirmIconWidth = 20;

export const KitchenUtensilWidth = FenceWidth * 0.984;
export const KitchenUtensilHeight = FenceWidth * 1.6;
export const VerticalWashbasinWidth = FenceWidth * 0.75;
export const VerticalWashbasinHeight1 = FenceWidth * 1.72;
export const VerticalWashbasinHeight2 = FenceWidth;

export const CookerWidth = 32;
export const CookerHeight = 50;

export * from "./cookerSkills";

export * from "./menus";
