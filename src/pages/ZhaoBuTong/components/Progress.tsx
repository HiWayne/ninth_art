import styled from "styled-components";
import { FC } from "react";

export const Progress = styled<
  FC<{
    className?: string;
    remainingTime: number;
    addTime?: number;
    decreaseTime?: number;
    currentTotalGameTime: number;
  }>
>(
  ({
    className,
    remainingTime,
    addTime = 0,
    decreaseTime = 0,
    currentTotalGameTime,
  }) => {
    return (
      <div className={className}>
        <span className="progress-bar">
          <span
            style={{
              width: `${((remainingTime / currentTotalGameTime) * 100).toFixed(
                2
              )}%`,
            }}
          />
        </span>
        <span className="text">
          {Math.round(remainingTime / 1000)}秒
          <span
            className={
              addTime ? "add-time" : decreaseTime ? "decrease-time" : ""
            }
            style={addTime || decreaseTime ? { opacity: 1 } : { opacity: 0 }}
          >
            {decreaseTime
              ? `-${Math.round(decreaseTime / 1000)}`
              : addTime
              ? `+${Math.round(addTime / 1000)}`
              : ""}
          </span>
        </span>
      </div>
    );
  }
)`
  margin-top: 8rem;
  padding: 8rem 23rem 8rem 69rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  & > .progress-bar {
    display: inline-flex;
    width: calc(100% - 146rem);
    height: 23rem;
    border-radius: 16rem;
    & > span {
      display: inline-block;
      height: 100%;
      background-color: #ef9535;
      border-radius: 16rem;
      transition: width 1s linear;
    }
  }
  & > .text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 135rem;
    height: 38rem;
    color: #1b1d12;
    & > span {
      margin-left: 8rem;
      transition: opacity 0.3s ease-out;
      font-size: 18px;
      font-weight: bold;
      &.add-time {
        color: #ef9535;
      }
      &.decrease-time {
        color: #ff4d4f;
      }
    }
  }
`;
