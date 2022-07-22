import useStore from "@/store";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import computeScore from "../utils/computeScore";
import { getWinnerText } from "../utils/getWinnerText";
import LineText from "./LineText";
import LineRedTitle from "./LineRedTitle";
import NewTag from "./NewTag";

const BEST_SCORE = "best-score";

const Score = styled(({ className }) => {
  const speededTime = useStore(
    (state) => state.fuzi.speededTime + state.fuzi.timePenalty
  );
  const timePenalty = useStore((state) => state.fuzi.timePenalty);
  const findCount = useStore(
    (state) => state.fuzi.totalCount - state.fuzi.countNoFind
  );

  const [isBest, setIsBest] = useState(false);
  const [prevBestScore, setPrevBestScore] = useState(0);

  const computedScore = useMemo(() => {
    return computeScore(findCount, speededTime);
  }, [speededTime, findCount]);

  const winnerText = useMemo(
    () => getWinnerText(findCount, speededTime),
    [findCount, speededTime]
  );

  useEffect(() => {
    const bestScoreString = window.localStorage.getItem(BEST_SCORE);

    const prevBestScore =
      bestScoreString !== undefined ? Number(bestScoreString) : 0;

    if (computedScore > prevBestScore) {
      window.localStorage.setItem(BEST_SCORE, computedScore + "");
      setIsBest(true);
      setPrevBestScore(computedScore);
    } else {
      setPrevBestScore(prevBestScore);
    }
  }, []);

  return (
    <div className={className}>
      <LineRedTitle>{winnerText}</LineRedTitle>
      <LineText className="line line-1">
        本次用时：{speededTime / 1000}s
        {timePenalty ? `（包含罚时: +${timePenalty / 1000}s）` : ""}
      </LineText>
      <LineText className="line line-2">共找到福字：{findCount}个</LineText>
      <LineText className="line line-3" style={{ position: "relative" }}>
        本次得分：{computedScore}
        {isBest ? <NewTag>新！</NewTag> : null}
      </LineText>
      <LineText className="line line-4" style={{ position: "relative" }}>
        历史最佳得分：{isBest ? computedScore : prevBestScore}
        {isBest ? <NewTag>新！</NewTag> : null}
      </LineText>
    </div>
  );
})`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  margin-top: -150px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 1
  font-size: 0;

  & > .line {
    transform: translate(200%, 0);
    opacity: 0;
  }

  & > .line-1 {
    animation: MoveLeft 1s ease-out forwards;
  }
  & > .line-2 {
    animation: 1s MoveLeft 0.2s ease-out forwards;
  }
  & > .line-3 {
    animation: 1s MoveLeft 0.4s ease-out forwards;
  }
  & > .line-4 {
    animation: 1s MoveLeft 0.6s ease-out forwards;
  }

  @keyframes MoveLeft {
    0% {
      transform: translate(200%, 0);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
`;

export default Score;
