import { Sprite } from "@inlet/react-pixi";
import { FC } from "react";
import toRightSeatImage from "../../assets/images/furnish/to-right-seat.png";
import toLeftSeatImage from "../../assets/images/furnish/to-left-seat.png";
import toBackSeatImage from "../../assets/images/furnish/to-back-seat.png";
import toFrontSeatImage from "../../assets/images/furnish/to-front-seat.png";
import {
  ToRightOrLeftSeatHeight,
  ToRightOrLeftSeatWidth,
} from "../../constant";

interface SeatProps {
  x: number;
  y: number;
  direction: "left" | "right" | "back" | "front";
  onClick: () => void
}

export const Seat: FC<SeatProps> = ({ x, y, direction, onClick }) => {
  let image = "";
  let width = 0;
  let height = 0;
  switch (direction) {
    case "right":
      image = toRightSeatImage;
      width = ToRightOrLeftSeatWidth;
      height = ToRightOrLeftSeatHeight;
      break;
    case "left":
      image = toLeftSeatImage;
      width = ToRightOrLeftSeatWidth;
      height = ToRightOrLeftSeatHeight;
      break;
    case "back":
      image = toBackSeatImage;
      width = 26;
      height = 56;
      break;
    case "front":
      image = toFrontSeatImage;
      width = 26;
      height = 76;
      break;
  }
  return <Sprite x={x} y={y} width={width} height={height} image={image} pointerdown={onClick} interactive={true} />;
};
