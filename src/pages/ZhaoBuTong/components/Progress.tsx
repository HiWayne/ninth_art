import styled from "styled-components";
import { FC } from "react";

export const Progress = styled<
  FC<{
    className?: string;
    remainingTime: number;
    decreaseTime?: number;
    currentTotalGameTime: number;
  }>
>(({ className, remainingTime, decreaseTime = 0, currentTotalGameTime }) => {
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
        <span style={decreaseTime ? { opacity: 1 } : { opacity: 0 }}>
          {decreaseTime ? `-${Math.round(decreaseTime / 1000)}` : ""}
        </span>
      </span>
    </div>
  );
})`
  margin-top: 4px;
  padding: 4px 12px 4px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  & > .progress-bar {
    display: inline-flex;
    width: calc(100% - 76px);
    height: 12px;
    border-radius: 8px;
    & > span {
      display: inline-block;
      height: 100%;
      background-color: #e3e322;
      border-radius: 8px;
      transition: width 1s linear;
    }
  }
  & > .text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 70px;
    color: #fff;
    & > span {
      margin-left: 4px;
      transition: opacity 0.3s ease-out;
      color: #e3e322;
      font-size: 18px;
      font-weight: bold;
    }
  }
`;
