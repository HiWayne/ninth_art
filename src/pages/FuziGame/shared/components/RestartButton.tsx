import styled from "styled-components";
import { filterBlur } from "shared/styles";
import useStore from "@/store";
import { useCallback } from "react";
import shallow from "zustand/shallow";
import { Fuzi, GameResultEnum } from "../types";
import { TOTAL_TIME } from "../../config";

const RestartButton = styled(({ ...props }) => {
  const [setFuziCards, setRemainingTime, setGameResult, setCountNoFind] =
    useStore<
      [
        (fuziCards: Fuzi[]) => void,
        (remainingTime: number) => void,
        (gameResult: GameResultEnum) => void,
        (countNoFind: number) => void
      ]
    >(
      (state) => [
        state.fuzi.setFuziCards,
        state.fuzi.setRemainingTime,
        state.fuzi.setGameResult,
        state.fuzi.setCountNoFind,
      ],
      shallow
    );

  const restart = useCallback(() => {
    setFuziCards([]);
    setRemainingTime(TOTAL_TIME);
    setGameResult(0);
    setCountNoFind(0);
  }, [setFuziCards, setRemainingTime, setGameResult, setCountNoFind]);

  return <button onClick={restart} {...props}></button>;
})`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 200px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: rgba(245, 108, 108, 0.8);
  z-index: 1;
  overflow: hidden;
  animation: Show 1.5s ease-out;
  font-size: 18px;
  color: #fff;
  ${filterBlur()}

  @keyframes Show {
    0% {
      bottom: -80px;
      opacity: 0;
    }
    100% {
      bottom: 200px;
      opacity: 1;
    }
  }
`;

export default RestartButton;
