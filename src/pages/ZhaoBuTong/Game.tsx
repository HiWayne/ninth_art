import { Flex } from "@/shared/components";
import { randomNumber, randomlyTaken } from "@/shared/utils";
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
import {
  FailPop,
  Progress,
  SuccessPop,
  Stars,
  InfoPop,
  BackButton,
  HelpButton,
} from "./components";
import {
  SAVED_LEVEL,
  SAVED_LEVELS_SCORE,
  SAVED_PROPS,
  charList,
} from "@/store/zhaoBuTong";
import correctIcon from "./assets/images/correct.png";
import errorIcon from "./assets/images/error.png";
import { useNavigate } from "react-router-dom";

interface Answers {
  row: number;
  column: number;
}

const Wrapper = styled.div`
  width: 100vw;
  height: -webkit-fill-available;
  background: linear-gradient(to right, #e1d998 0px, #e3dfb2 50%, #e1d998 100%);
`;

const LevelInfo = styled.div`
  position: relative;
`;

const CurrentChar = styled.div`
  position: absolute;
  left: -52px;
  top: 50%;
  transform: translate(-100%, -50%);
  color: #000;
  font-size: 20px;
`;

const LevelText = styled.div`
  margin-left: 20px;
  margin-right: 4px;
  color: #995f31;
  font-size: 14px;
  font-weight: bold;
`;

const Grid = styled(({ className, children }) => (
  <div className={className}>{children}</div>
))`
  margin-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  border: 1px solid #6d604f;
  background: #f8f6e7;
`;

const GridItem = styled<
  FC<{
    className?: string;
    children: JSX.Element | string;
    onClick: MouseEventHandler;
    success: boolean;
    error: boolean;
  }>
>(({ className, children, onClick, success, error }) => (
  <div className={className} onClick={onClick}>
    {children}
  </div>
))`
  position: relative;
  display: inline-block;
  margin-left: 8px;
  margin-top: 8px;
  padding: 2px;
  font-size: 20px;
  color: #030303;
  cursor: pointer;
  ${(props) =>
    props.success
      ? `&::after {content: ""; position: absolute; bottom: 0; left: 60%; transform: translateX(-50%); z-index: 1; width: 24px; height: 24px; background: url("${correctIcon}") center / contain no-repeat;}`
      : props.error
      ? `&::after {content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); z-index: 1; width: 24px; height: 24px; background: url("${errorIcon}") center / contain no-repeat;}`
      : ""}
`;

const ROW_COUNT = 10;
const COLUMN_COUNT = 10;
export const REMAINING_TIME = 120000; // 毫秒
let savedLevelsScoreRef: {
  current: Record<
    number,
    {
      level: number;
      score: number | null;
      remainingTime: number;
      speedTime: number | null;
      minSpeedTime: number | null;
      recordDate: number | null;
      gotProp: boolean;
    }
  >;
} = { current: {} };
try {
  savedLevelsScoreRef.current = JSON.parse(
    window.localStorage.getItem(SAVED_LEVELS_SCORE) || ""
  );
} catch {
  savedLevelsScoreRef.current = {
    0: {
      level: 0,
      score: null,
      remainingTime: REMAINING_TIME,
      speedTime: null,
      minSpeedTime: null,
      recordDate: null,
      gotProp: false,
    },
  };
}
const savedProps = window.localStorage.getItem(SAVED_PROPS) || `0`;

const ZhaoBuTong = () => {
  const {
    currentLevel,
    setCurrentLevel,
    shaking,
    setShaking,
    gamePropsCount,
    setGamePropsCount,
  } = useStore(
    (state) => ({
      currentLevel: state.zhaoBuTong.currentLevel,
      setCurrentLevel: state.zhaoBuTong.setCurrentLevel,
      shaking: state.zhaoBuTong.shaking,
      setShaking: state.zhaoBuTong.setShaking,
      gamePropsCount: state.zhaoBuTong.gamePropsCount,
      setGamePropsCount: state.zhaoBuTong.setGamePropsCount,
    }),
    shallow
  );

  const currentChars = useMemo(() => charList[currentLevel], [currentLevel]);

  const [successPopVisibility, setSuccessPopVisibility] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    savedLevelsScoreRef.current[currentLevel]?.remainingTime
      ? savedLevelsScoreRef.current[currentLevel].remainingTime
      : REMAINING_TIME
  );
  const [currentTotalGameTime, setCurrentTotalGameTime] =
    useState(remainingTime);
  const [addTime, setAddTime] = useState(0);
  const [decreaseTime, setDecreaseTime] = useState(0);
  const [failPopVisibility, setFailPopVisibility] = useState(false);
  const [infoPopVisibility, setInfoPopVisibility] = useState(false);
  const [infoText, setInfoText] = useState("");
  // 本关使用了道具
  const [usedProp, setUsedProp] = useState(false);
  // 本关获得了道具
  const [gotProp, setGotProp] = useState(
    savedLevelsScoreRef.current[currentLevel].gotProp
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<Answers | null>(null);
  const [currentStars, setCurrentStars] = useState(3);
  const [replayCounts, setReplayCounts] = useState(0);

  const timerRef = useRef<number | null>(null);
  const currentLevelStartTimeRef = useRef(Date.now());
  const speedTimeRef = useRef(0);

  const answers = useMemo<Answers>(() => {
    const row = randomNumber(0, ROW_COUNT - 1);
    const column = randomNumber(0, COLUMN_COUNT - 1);
    return {
      row,
      column,
    };
  }, [currentLevel]);

  const navigate = useNavigate();

  // 重置关卡的通用信息
  const resetLevel = useCallback(() => {
    setSuccess(false);
    setError(false);
    setClickedPosition(null);
    setGotProp(savedLevelsScoreRef.current[currentLevel].gotProp);
    setSuccessPopVisibility(false);
    setFailPopVisibility(false);
    setInfoPopVisibility(false);
    setCurrentStars(3);
    currentLevelStartTimeRef.current = Date.now();
    speedTimeRef.current = 0;
  }, [currentLevel]);

  // 重玩本关
  const restartLevel = useCallback(() => {
    resetLevel();
    setRemainingTime(currentTotalGameTime);
    setReplayCounts((counts) => counts + 1);
  }, [resetLevel]);

  // 下一关
  const goNextLevel = useCallback(() => {
    if (currentLevel < charList.length - 1) {
      resetLevel();
      // 下一关时间在本关剩余时间基础上增加30~60秒
      const extractTime = randomNumber(30000, 60000);
      const nextLevelTime = remainingTime + extractTime;
      window.localStorage.setItem(SAVED_LEVEL, `${currentLevel + 1}`);
      savedLevelsScoreRef.current[currentLevel + 1] = {
        level: currentLevel + 1,
        score: null,
        remainingTime: nextLevelTime,
        speedTime: null,
        minSpeedTime: null,
        recordDate: null,
        gotProp: false,
      };
      window.localStorage.setItem(
        SAVED_LEVELS_SCORE,
        JSON.stringify(savedLevelsScoreRef.current)
      );
      setCurrentLevel(currentLevel + 1);
      setAddTime(extractTime);
      setRemainingTime(nextLevelTime);
      setCurrentTotalGameTime(nextLevelTime);
      setReplayCounts(0);
      setTimeout(() => {
        setAddTime(0);
      }, 1000);
    }
  }, [currentLevel, remainingTime, resetLevel]);

  const handleClickChar = useCallback(
    (receivedAnswers: Answers) => {
      if (remainingTime <= 0) {
        return;
      }
      setClickedPosition(receivedAnswers);
      // 答对
      if (
        receivedAnswers.row === answers.row &&
        receivedAnswers.column === answers.column
      ) {
        clearTimeout(timerRef.current!);
        setSuccess(true);

        // 如果在不使用道具的情况下，10秒内找出答案，奖励一个道具。本关已获得过道具除外
        if (!gotProp && !usedProp && speedTimeRef.current <= 10000) {
          setGotProp(true);
          setGamePropsCount(gamePropsCount + 1);
          window.localStorage.setItem(SAVED_PROPS, `${gamePropsCount + 1}`);
        }

        if (!savedLevelsScoreRef.current[currentLevel]) {
          savedLevelsScoreRef.current[currentLevel] = {
            level: currentLevel,
            score: null,
            remainingTime: currentTotalGameTime,
            speedTime: null,
            minSpeedTime: null,
            recordDate: null,
            gotProp,
          };
        }
        savedLevelsScoreRef.current[currentLevel].score = currentStars;
        savedLevelsScoreRef.current[currentLevel].speedTime =
          speedTimeRef.current;
        if (!savedLevelsScoreRef.current[currentLevel].gotProp) {
          savedLevelsScoreRef.current[currentLevel].gotProp = gotProp;
        }
        if (
          !savedLevelsScoreRef.current[currentLevel].minSpeedTime ||
          (savedLevelsScoreRef.current[currentLevel].minSpeedTime &&
            speedTimeRef.current <
              savedLevelsScoreRef.current[currentLevel].minSpeedTime!)
        ) {
          savedLevelsScoreRef.current[currentLevel].minSpeedTime =
            speedTimeRef.current;
          savedLevelsScoreRef.current[currentLevel].recordDate = Date.now();
        }
        window.localStorage.setItem(
          SAVED_LEVELS_SCORE,
          JSON.stringify(savedLevelsScoreRef.current)
        );
        setSuccessPopVisibility(true);
      } else {
        setShaking(true);
        setError(true);
        // 罚时
        setRemainingTime((time) => (time - 2000 < 0 ? 0 : time - 2000));
        setDecreaseTime(2000);
        currentLevelStartTimeRef.current -= 2000;
        setTimeout(() => {
          setShaking(false);
          setError(false);
          setDecreaseTime(0);
        }, 1000);
      }
    },
    [answers, remainingTime, gamePropsCount, usedProp, currentStars, gotProp]
  );

  const openHelp = useCallback(() => {
    if (gamePropsCount > 0) {
      setUsedProp(true);
      setGamePropsCount(gamePropsCount - 1);
      window.localStorage.setItem(SAVED_PROPS, `${gamePropsCount - 1}`);
      setInfoPopVisibility(true);
      const helpTypeIsColumn = Math.random() < 0.5;
      const offset = randomlyTaken([-1, 0, 1], 1).result[0];
      let helpRange: number[] = [];
      if (helpTypeIsColumn) {
        if (answers.column === 0) {
          helpRange = [1, 2, 3];
        } else if (answers.column === COLUMN_COUNT - 1) {
          helpRange = [COLUMN_COUNT - 2, COLUMN_COUNT - 1, COLUMN_COUNT];
        } else if (offset === -1) {
          if (answers.column > 1) {
            helpRange = [
              answers.column - 1,
              answers.column,
              answers.column + 1,
            ];
          } else {
            helpRange = [
              answers.column,
              answers.column + 1,
              answers.column + 2,
            ];
          }
        } else if (offset === 0) {
          helpRange = [answers.column, answers.column + 1, answers.column + 2];
        } else {
          helpRange = [
            answers.column + 1,
            answers.column + 2,
            answers.column + 3,
          ];
        }
      } else {
        if (answers.row === 0) {
          helpRange = [1, 2, 3];
        } else if (answers.row === COLUMN_COUNT - 1) {
          helpRange = [COLUMN_COUNT - 2, COLUMN_COUNT - 1, COLUMN_COUNT];
        } else if (offset === -1) {
          if (answers.row > 1) {
            helpRange = [answers.row - 1, answers.row, answers.row + 1];
          } else {
            helpRange = [answers.row, answers.row + 1, answers.row + 2];
          }
        } else if (offset === 0) {
          helpRange = [answers.row, answers.row + 1, answers.row + 2];
        } else {
          helpRange = [answers.row + 1, answers.row + 2, answers.row + 3];
        }
      }
      setInfoText(
        helpTypeIsColumn
          ? `试着找找${helpRange.join(", ")}列里的字`
          : `线索在${helpRange.join(", ")}行里哦`
      );
      setGamePropsCount(gamePropsCount - 1);
    }
  }, [gamePropsCount, answers]);

  const closeHelp = useCallback(() => {
    setInfoPopVisibility(false);
    setInfoText("");
  }, []);

  useEffect(() => {
    if (infoPopVisibility) {
      clearTimeout(timerRef.current!);
    } else {
      timerRef.current = setTimeout(() => {
        setRemainingTime((time) => (time - 1000 < 0 ? 0 : time - 1000));
      }, 1000);
    }
    if (remainingTime <= 0) {
      clearTimeout(timerRef.current!);
      if (!failPopVisibility) {
        setFailPopVisibility(true);
      }
    }
    return () => clearTimeout(timerRef.current!);
  }, [currentLevel, replayCounts, remainingTime, infoPopVisibility]);

  useEffect(() => {
    speedTimeRef.current = Date.now() - currentLevelStartTimeRef.current;
    let score: number;
    if (speedTimeRef.current <= 60000) {
      score = 3;
    } else if (speedTimeRef.current <= 90000) {
      score = 2;
    } else {
      score = 1;
    }
    setCurrentStars(score);
  }, [remainingTime]);

  useEffect(() => {
    try {
      savedLevelsScoreRef.current = JSON.parse(
        window.localStorage.getItem(SAVED_LEVELS_SCORE) || ""
      );
    } catch {
      savedLevelsScoreRef.current = {
        0: {
          level: 0,
          score: null,
          remainingTime: REMAINING_TIME,
          speedTime: null,
          minSpeedTime: null,
          recordDate: null,
          gotProp: false,
        },
      };
    }
  }, []);

  return (
    <Wrapper>
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        style={shaking ? { animation: "shaking 0.25s linear 4" } : undefined}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{
            width: "100%",
            margin: "20px 0",
            padding: "0 28px",
            boxSizing: "border-box",
          }}
        >
          <BackButton
            onClick={() => {
              navigate("/games/zhaobutong/levels");
            }}
          />
          <HelpButton onClick={openHelp}>
            查看提示
            <span
              style={{
                marginLeft: "2px",
                color: "#ff4d4f",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              x{gamePropsCount}
            </span>
          </HelpButton>
        </Flex>
        <Flex justify="center" align="center" style={{ width: "100%" }}>
          <LevelInfo>
            <CurrentChar>找到：{currentChars[0]}</CurrentChar>
            <LevelText>第{currentLevel + 1}关</LevelText>
            <Stars
              counts={3}
              style={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translate(100%, -50%)",
              }}
            />
          </LevelInfo>
        </Flex>
        <Progress
          remainingTime={remainingTime}
          addTime={addTime}
          decreaseTime={decreaseTime}
          currentTotalGameTime={currentTotalGameTime}
        />
        <Grid cellSpacing={0}>
          {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`}>
              {Array.from({ length: COLUMN_COUNT }).map((_, columnIndex) => (
                <GridItem
                  key={`column-${columnIndex}`}
                  onClick={() => {
                    handleClickChar({ row: rowIndex, column: columnIndex });
                  }}
                  success={
                    success &&
                    clickedPosition?.column === columnIndex &&
                    clickedPosition?.row === rowIndex
                  }
                  error={
                    error &&
                    clickedPosition?.column === columnIndex &&
                    clickedPosition?.row === rowIndex
                  }
                >
                  {!(rowIndex === answers.row && columnIndex === answers.column)
                    ? currentChars[1]
                    : currentChars[0]}
                </GridItem>
              ))}
            </div>
          ))}
        </Grid>
      </Flex>
      <SuccessPop
        visibility={successPopVisibility}
        stars={currentStars}
        onNext={goNextLevel}
        onRestart={restartLevel}
        gotProp={gotProp}
      />
      <FailPop visibility={failPopVisibility} onClick={restartLevel} />
      <InfoPop
        visibility={infoPopVisibility}
        title="提示"
        onClose={closeHelp}
        closeOnMaskClick
      >
        {infoText}
      </InfoPop>
    </Wrapper>
  );
};

export default ZhaoBuTong;
