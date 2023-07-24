import { Flex } from "@/shared/components";
import { randomNumber } from "@/shared/utils";
import useStore from "@/store";
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";
import { FailPop, Progress, SuccessPop } from "./components";
import { charList } from "@/store/zhaoBuTong";

interface Answers {
  row: number;
  column: number;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #333;
`;

const CurrentChar = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e3e322;
  color: #000;
  font-size: 48px;
`;

const LevelText = styled.div`
  position: relative;
  margin-top: 8px;
  color: #ddd;
  font-size: 16px;
  &::before {
    content: "汉字找不同";
    white-space: nowrap;
    position: absolute;
    left: -130px;
    color: #ed4c4c;
    font-size: 18px;
    font-weight: bold;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Grid = styled(({ className, children }) => (
  <div className={className}>
    <table>
      <thead />
      <tbody>{children}</tbody>
      <tfoot />
    </table>
  </div>
))`
  margin-top: 8px;
  margin-left: 16px;
  padding: 6px;
  border: 2px solid #000;
  background: #e3e322;
  & > table {
    border-collapse: collapse;
  }
`;

const GridItem = styled<
  FC<{
    className?: string;
    children: JSX.Element | string;
    leftSeq?: number;
    bottomSeq?: number;
    onClick: MouseEventHandler;
  }>
>(({ className, children, onClick }) => (
  <td className={className} onClick={onClick}>
    {children}
  </td>
))`
  ${(props) => (props.leftSeq || props.bottomSeq ? "position: relative;" : "")}
  ${(props) =>
    props.leftSeq
      ? `&::before {content: "${props.leftSeq}"; position: absolute; left: -32px; top: 50%; transform: translateY(-50%); color: #fff;}`
      : ""}
  ${(props) =>
    props.bottomSeq
      ? `&::after {content: "${props.bottomSeq}"; position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%); color: #fff;}`
      : ""}
  border: 2px solid #000;
  padding: 6px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
`;

const ROW_COUNT = 11;
const COLUMN_COUNT = 11;
export const REMAINING_TIME = 120000; // 毫秒

const ZhaoBuTong = () => {
  const [successPopVisibility, setSuccessPopVisibility] = useState(false);
  const [remainingTime, setRemainingTime] = useState(REMAINING_TIME);
  const [currentTotalGameTime, setCurrentTotalGameTime] = useState(REMAINING_TIME);
  const [decreaseTime, setDecreaseTime] = useState(0);
  const [failPopVisibility, setFailPopVisibility] = useState(false);

  const timerRef = useRef<number | null>(null);

  const {
    currentChars,
    setCurrentChar,
    currentIndex,
    setCurrentIndex,
    shaking,
    setShaking,
  } = useStore(
    (state) => ({
      currentChars: state.zhaoBuTong.currentChars,
      setCurrentChar: state.zhaoBuTong.setCurrentChar,
      currentIndex: state.zhaoBuTong.currentIndex,
      setCurrentIndex: state.zhaoBuTong.setCurrentIndex,
      shaking: state.zhaoBuTong.shaking,
      setShaking: state.zhaoBuTong.setShaking,
    }),
    shallow
  );

  const answers = useMemo<Answers>(() => {
    const row = randomNumber(0, 10);
    const column = randomNumber(0, 10);
    return {
      row,
      column,
    };
  }, [currentChars]);
  console.log(answers);

  const handleClickChar = useCallback(
    (receivedAnswers: Answers) => {
      if (remainingTime <= 0) {
        return;
      }
      if (
        receivedAnswers.row === answers.row &&
        receivedAnswers.column === answers.column
      ) {
        clearInterval(timerRef.current!);
        setSuccessPopVisibility(true);
        if (currentIndex < charList.length - 1) {
          setTimeout(() => {
            setSuccessPopVisibility(false);
            setCurrentIndex(currentIndex + 1);
            setCurrentChar(charList[currentIndex + 1]);
            // 下一关时间在本关剩余时间基础上增加30~60秒
            const nextLevelTime = remainingTime + randomNumber(30000, 60000);
            setRemainingTime(nextLevelTime);
            setCurrentTotalGameTime(nextLevelTime);
          }, 3000);
        }
      } else {
        setShaking(true);
        // 罚时
        setRemainingTime((time) => (time - 2000 < 0 ? 0 : time - 2000));
        setDecreaseTime(2000);
        setTimeout(() => {
          setShaking(false);
          setDecreaseTime(0);
        }, 1000);
      }
    },
    [answers, currentIndex, remainingTime]
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingTime((time) => (time - 1000 < 0 ? 0 : time - 1000));
    }, 1000);
    if (remainingTime <= 0) {
      clearInterval(timerRef.current);
      if (!failPopVisibility) {
        setFailPopVisibility(true);
      }
    }
    return () => clearInterval(timerRef.current!);
  }, [currentChars, remainingTime]);

  return (
    <Wrapper>
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        style={shaking ? { animation: "shaking 0.25s linear 4" } : undefined}
      >
        <CurrentChar>{currentChars[0]}</CurrentChar>
        <LevelText>第{currentIndex + 1}关</LevelText>
        <Progress
          remainingTime={remainingTime}
          decreaseTime={decreaseTime}
          currentTotalGameTime={currentTotalGameTime}
        />
        <Grid cellSpacing={0}>
          {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {Array.from({ length: COLUMN_COUNT }).map((_, columnIndex) => (
                <GridItem
                  key={`column-${columnIndex}`}
                  leftSeq={columnIndex === 0 ? rowIndex + 1 : undefined}
                  bottomSeq={
                    rowIndex === COLUMN_COUNT - 1 ? columnIndex + 1 : undefined
                  }
                  onClick={() => {
                    handleClickChar({ row: rowIndex, column: columnIndex });
                  }}
                >
                  {!(rowIndex === answers.row && columnIndex === answers.column)
                    ? currentChars[1]
                    : currentChars[0]}
                </GridItem>
              ))}
            </tr>
          ))}
        </Grid>
      </Flex>
      {successPopVisibility ? <SuccessPop /> : null}
      {failPopVisibility ? <FailPop /> : null}
    </Wrapper>
  );
};

export default ZhaoBuTong;
