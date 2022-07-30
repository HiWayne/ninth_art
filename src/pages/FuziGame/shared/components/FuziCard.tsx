import { isMobile } from "@/shared/utils/isMobile";
import { FC, MouseEventHandler, TouchEventHandler } from "react";
import styled from "styled-components";
import { FuziCardProps } from "../types";

const FuziCard = styled<FC<FuziCardProps>>(
  ({ className, data, onClick, onTouch }) =>
    isMobile() ? (
      <div
        className={className}
        onClick={onClick}
        onTouchStart={onTouch as TouchEventHandler<HTMLDivElement>}
      >
        福
      </div>
    ) : (
      <div
        className={className}
        onClick={onClick}
        onMouseDown={onTouch as MouseEventHandler<HTMLDivElement>}
      >
        福
      </div>
    )
)`
  display: inline-block;
  height: 60px;
  background: red;
  margin: 16px;
  padding: 0 12px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  transition: opacity 0.3s ease-in;
  opacity: ${(props) => props.data.opacity};
  animation: ${(props) =>
      props.data.isCounterclockwise ? "Counterclockwise" : "Clockwise"}
    5s linear infinite;

  /* 顺时针 */
  @keyframes Clockwise {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  /* 逆时针 */
  @keyframes Counterclockwise {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(-360deg);
    }
  }
`;

export default FuziCard;
