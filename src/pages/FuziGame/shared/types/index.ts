import { MouseEventHandler } from "react";

export interface Fuzi {
  isCounterclockwise: boolean;
  opacity: number;
}

export interface FuziCardProps {
  className?: string;
  data: Fuzi;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type GameResultEnum = 0 | 1 | 2;

export interface GameResultProps {
  result: GameResultEnum;
}
