// iphone 12 pro, iphone xr
const baseRatio = 896 / 414;
const ratio = window.innerHeight / window.innerWidth;
const baseHeight = window.innerWidth * baseRatio;
const baseFenceWidth = window.innerWidth * 0.042;

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

export const cancelIconWidth = 20;
export const confirmIconWidth = 20;