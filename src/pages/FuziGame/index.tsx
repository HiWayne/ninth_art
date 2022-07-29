import useImmediateState from "@/shared/hooks/useImmediateState";
import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import GameResult from "./GameResult";
import CardsList from "./shared/components/CardsList";
import FuziCard from "./shared/components/FuziCard";
import Notification, {
  NotificationTypeEnum,
} from "./shared/components/Notification";
import Tip from "./shared/components/Tip";
import type { Fuzi, GameResultEnum } from "./shared/types";
import useStore from "store/index";
import shallow from "zustand/shallow";
import { TotalCountComputer } from "@/store/fuzi";
import { PROBABILITY, TOTAL_TIME } from "./config";
import { random } from "@/shared/utils/random";
import Title from "./shared/components/Title";
import Subtitle from "./shared/components/SubTitle";

const FuziWrapper = styled.main`
  user-select: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
`;

const StartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  margin-top: 20px;
  display: inline-block;
  width: 80px;
  height: 35px;
  font-size: 16px;
  background: rgba(246, 87, 55, 0.961);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const StatisticsWrapper = styled(({ className, children }) => (
  <div className={className}>{children}</div>
))`
  margin: 30px 0;
  font-size: 14px;
`;

const Statistics = styled.p`
  line-height: 20px;
  text-align: center;
`;

const BoldText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const CARD_COUNT = 100;
const INTERVAL: number = 100;

// fuzi '福字'
const FuziGame = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationTypeEnum>("good");
  // 用ref防止快速重复点击时，新状态还未及时应用到ui的情况
  const [fuziCards, setFuziCards, setFuzi] = useStore<
    [
      Fuzi[],
      (fuziCards: Fuzi[]) => void,
      (index: number, part: Partial<Fuzi>) => void
    ]
  >(
    (state) => [
      state.fuzi.fuziCards,
      state.fuzi.setFuziCards,
      state.fuzi.setFuzi,
    ],
    shallow
  );
  const [
    countNoFind,
    setCountNoFind,
    addCountNoFind,
    decreaseCountNoFind,
    setTotalCount,
  ] = useStore<
    [
      number,
      (countNoFind: number) => void,
      () => void,
      () => void,
      (totalCount: number | TotalCountComputer) => void
    ]
  >(
    (state) => [
      state.fuzi.countNoFind,
      state.fuzi.setCountNoFind,
      state.fuzi.addCountNoFind,
      state.fuzi.decreaseCountNoFind,
      state.fuzi.setTotalCount,
    ],
    shallow
  );
  const [remainingTime, setRemainingTime, decreaseRemainingTime] = useStore<
    [number, (remainingTime: number) => void, (interval: number) => void]
  >(
    (state) => [
      state.fuzi.remainingTime,
      state.fuzi.setRemainingTime,
      state.fuzi.decreaseRemainingTime,
    ],
    shallow
  );

  const [setOvertime, setTimePenalty, setSpeededTime] = useStore<
    [
      (time: number | ((prevTime: number) => number)) => void,
      (time: number | ((prevTime: number) => number)) => void,
      (time: number) => void
    ]
  >(
    (state) => [
      state.fuzi.setOvertime,
      state.fuzi.setTimePenalty,
      state.fuzi.setSpeededTime,
    ],
    shallow
  );

  // 0 - 进行中, 1 - 胜利, 2 - 失败
  const [gameResult, setGameResult] = useStore<
    [GameResultEnum, (gameResult: GameResultEnum) => void]
  >((state) => [state.fuzi.gameResult, state.fuzi.setGameResult], shallow);

  const gameProgressTimerRef: MutableRefObject<number | null> = useRef(null);

  const speededTimeRef: MutableRefObject<number> = useRef(0);

  const remainingTimeForShow = useMemo(
    () => remainingTime / 1000,
    [remainingTime]
  );

  // 0 - 进行中, 1 - 胜利, 2 - 失败
  const checkForVictory = useCallback(() => {
    const latestCountNoFind = useStore.getState().fuzi.countNoFind;
    const latestRemainingTime = useStore.getState().fuzi.remainingTime;
    if (latestRemainingTime > 0 && latestCountNoFind > 0) {
      return 0;
    } else if (latestRemainingTime > 0 && latestCountNoFind <= 0) {
      return 1;
    } else {
      return 2;
    }
  }, []);

  const handleGameProgress = useCallback(() => {
    if (gameProgressTimerRef.current !== null) {
      clearTimeout(gameProgressTimerRef.current);
    }
    gameProgressTimerRef.current = setTimeout(() => {
      const result = checkForVictory();
      if (result === 0) {
        decreaseRemainingTime(INTERVAL);
        handleGameProgress();
      } else {
        speededTimeRef.current = new Date().getTime() - speededTimeRef.current;
        setSpeededTime(speededTimeRef.current);
        speededTimeRef.current = 0;
        setGameResult(result);
      }
    }, INTERVAL);
    return gameProgressTimerRef.current;
  }, []);

  const startGame = useCallback(() => {
    setTotalCount(0);
    setCountNoFind(0);
    setRemainingTime(TOTAL_TIME);

    speededTimeRef.current = new Date().getTime();

    const cards = new Array(100).fill(true).map(() => {
      // 有概率出现逆时针
      const isCounterclockwise = random(PROBABILITY);
      if (isCounterclockwise) {
        addCountNoFind();
        setTotalCount((totalCount) => totalCount + 1);
      }
      return {
        isCounterclockwise,
        opacity: 1,
      };
    });
    // 概率兜底，至少要有一个
    if (cards.every((card) => card.isCounterclockwise === false)) {
      const count = CARD_COUNT;
      const index = Math.round(Math.random() * count);
      cards[index].isCounterclockwise = true;
      addCountNoFind();
      setTotalCount((totalCount) => totalCount + 1);
    }
    setFuziCards(cards);
    handleGameProgress();
  }, []);

  // 逆时针福字总数>=10时，获得buff，点击正确时间增加 +2s，剩余逆时针福字数量<=7时buff结束
  // 逆时针福字总数>=7时，获得buff，点击正确时间增加 +1s，剩余逆时针福字数量<=5时buff结束
  const handleClickCardCorrectly = useCallback((index: number) => {
    const latestFuziCards = useStore.getState().fuzi.fuziCards;
    if (checkForVictory() !== 0 || latestFuziCards[index].opacity === 0) {
      return;
    }
    const totalCount = useStore.getState().fuzi.totalCount;
    const latestCountNoFind = useStore.getState().fuzi.countNoFind;
    if (totalCount >= 10 && latestCountNoFind > 7) {
      setNotificationType("good");
      setNotificationText("+2s：获得buff，时间加2秒");
      setOvertime((prevTime) => prevTime + 2000);
      setShowNotification(false);
      setTimeout(() => {
        setShowNotification(true);
      }, 50);
    } else if (totalCount >= 7 && latestCountNoFind >= 5) {
      setNotificationType("good");
      setNotificationText("+1s：获得buff，时间加1秒");
      setOvertime((prevTime) => prevTime + 1000);
      setShowNotification(false);
      setTimeout(() => {
        setShowNotification(true);
      }, 50);
    }
    setFuzi(index, { opacity: 0 });
    decreaseCountNoFind();
  }, []);

  // 错误点击时产生扣时效果 -0.5s
  const handleClickCardIncorrectly = useCallback(() => {
    if (checkForVictory() !== 0) {
      return;
    }
    decreaseRemainingTime(500);
    setNotificationType("bad");
    setNotificationText("-0.5s：点错啦，时间减0.5秒");
    setTimePenalty((prevTime) => prevTime + 500);
    setShowNotification(false);
    setTimeout(() => {
      setShowNotification(true);
    }, 50);
  }, []);

  return (
    <FuziWrapper>
      <Title>找福字</Title>
      <Subtitle>限定时间内</Subtitle>
      <Subtitle>找出所有逆时针旋转的福字</Subtitle>
      <Tip>
        当要找的福字&gt;=7个时，每找对一个会加时2秒哦。未找到的福字&lt;5个时效果消失，好好利用吧
      </Tip>
      <Tip>找错福字会扣时0.5秒🥺</Tip>
      <StartButtonWrapper>
        <StartButton onClick={startGame}>开始</StartButton>
      </StartButtonWrapper>
      <StatisticsWrapper>
        <Statistics>限时8秒</Statistics>
        <Statistics>
          还有<BoldText>{countNoFind}</BoldText>个没找到，剩余
          <BoldText>{remainingTimeForShow}</BoldText>秒
        </Statistics>
      </StatisticsWrapper>
      <CardsList>
        {fuziCards.map((item, index) => {
          return (
            <FuziCard
              key={index}
              data={item}
              onClick={
                item.isCounterclockwise
                  ? () => handleClickCardCorrectly(index)
                  : handleClickCardIncorrectly
              }
            />
          );
        })}
      </CardsList>
      <GameResult result={gameResult} />
      <Notification
        show={showNotification}
        text={notificationText}
        type={notificationType}
      />
    </FuziWrapper>
  );
};

export default FuziGame;
