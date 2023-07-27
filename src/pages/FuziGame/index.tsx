import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Modal, Form, Input } from "antd-mobile";
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
import {
  GAME_SETTINGS,
  GameSettingsType,
  formatGameSettings,
  savedGameSettings,
} from "@/store/fuzi";
import { PROBABILITY } from "./config";
import { random } from "@/shared/utils/random";
import {
  TitleZhao,
  TitleFu,
  TitleZi,
  TitleWrapper,
} from "./shared/components/Titles";
import Subtitle from "./shared/components/SubTitle";
import startButtonIcon from "./assets/images/start_button.png";
import settingButtonIcon from "./assets/images/setting_button@64.png";
import { Flex } from "@/shared/components";
import produce from "immer";
import { randomlyTaken } from "@/shared/utils";
import { useNavigate } from "react-router-dom";

const FuziWrapper = styled(({ className, children }) => {
  const shaking = useStore((state) => state.fuzi.shaking);
  return (
    <main
      style={shaking ? { animation: "shaking 0.25s linear 4" } : undefined}
      className={className}
    >
      {children}
    </main>
  );
})`
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
  width: 103px;
  height: 34px;
  background: url("${startButtonIcon}") center / contain no-repeat;
  border: none;
  cursor: pointer;
`;

const SettingButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 45px;
  background: url("${settingButtonIcon}") center / contain no-repeat;
  border: none;
  cursor: pointer;
`;

const SettingText = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: bold;
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
    addRemainingTime,
    decreaseCountNoFind,
    setTotalNeedFinding,
    setShaking,
  ] = useStore(
    (state) => [
      state.fuzi.countNoFind,
      state.fuzi.setCountNoFind,
      state.fuzi.addCountNoFind,
      state.fuzi.addRemainingTime,
      state.fuzi.decreaseCountNoFind,
      state.fuzi.setTotalNeedFinding,
      state.fuzi.setShaking,
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

  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [gameSettings, setGameSettings] = useState(savedGameSettings);
  const [tempGameSettings, setTempGameSettings] = useState(gameSettings);

  const [findingNumberHelp, setFindingNumberHelp] = useState("");

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

  // 有默认值的gameSettings
  const normalizeGameSettings = useMemo<GameSettingsType>(() => {
    return formatGameSettings(gameSettings);
  }, [gameSettings]);

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
    setTotalNeedFinding(0);
    setCountNoFind(0);
    setRemainingTime(normalizeGameSettings.timeLimit! * 1000);

    speededTimeRef.current = new Date().getTime();
    let cards: Fuzi[];
    if (!normalizeGameSettings.findingNumber) {
      cards = new Array(normalizeGameSettings.totalNumber)
        .fill(true)
        .map(() => {
          // 有概率出现逆时针
          const isCounterclockwise = random(PROBABILITY);
          if (isCounterclockwise) {
            addCountNoFind();
            setTotalNeedFinding((totalNeedFinding) => totalNeedFinding + 1);
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
        setTotalNeedFinding((totalNeedFinding) => totalNeedFinding + 1);
      }
    } else {
      cards = new Array(normalizeGameSettings.totalNumber)
        .fill(true)
        .map(() => {
          return {
            isCounterclockwise: false,
            opacity: 1,
          };
        });
      const indexes = randomlyTaken(
        Array.from({ length: normalizeGameSettings.totalNumber as number }).map(
          (_, i) => i
        ),
        normalizeGameSettings.findingNumber
      ).result;
      indexes.forEach((index) => {
        cards[index].isCounterclockwise = true;
        addCountNoFind();
        setTotalNeedFinding((totalNeedFinding) => totalNeedFinding + 1);
      });
    }
    setFuziCards(cards);
    handleGameProgress();
  }, [normalizeGameSettings]);

  // 逆时针福字总数>=3时，可以获得buff，点击正确时间增加 +xs，剩余逆时针福字数量<3时buff结束
  const handleClickCardCorrectly = useCallback(
    (index: number) => {
      const latestFuziCards = useStore.getState().fuzi.fuziCards;
      if (checkForVictory() !== 0 || latestFuziCards[index].opacity === 0) {
        return;
      }
      const latestCountNoFind = useStore.getState().fuzi.countNoFind;
      if (latestCountNoFind >= 3) {
        addRemainingTime(
          Math.round((2000 * normalizeGameSettings.buffPercent!) / 100)
        );
        setNotificationType("good");
        setNotificationText(
          `+${((2 * normalizeGameSettings.buffPercent!) / 100).toFixed(
            1
          )}s：获得buff，时间增加`
        );
        setOvertime(
          (prevTime) =>
            prevTime +
            Math.round((2000 * normalizeGameSettings.buffPercent!) / 100)
        );
        setShowNotification(false);
        setTimeout(() => {
          setShowNotification(true);
        }, 50);
      }
      setFuzi(index, { opacity: 0 });
      decreaseCountNoFind();
    },
    [normalizeGameSettings]
  );

  // 错误点击时产生扣时效果 -xs
  const handleClickCardIncorrectly = useCallback(() => {
    if (checkForVictory() !== 0) {
      return;
    }
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 1000);
    decreaseRemainingTime(
      Math.round((500 * normalizeGameSettings.debuffPercent!) / 100)
    );
    setNotificationType("bad");
    setNotificationText(
      `-${((0.5 * normalizeGameSettings.debuffPercent!) / 100).toFixed(
        1
      )}s：点错啦，时间减少`
    );
    setTimePenalty(
      (prevTime) =>
        prevTime +
        Math.round((500 * normalizeGameSettings.debuffPercent!) / 100)
    );
    setShowNotification(false);
    setTimeout(() => {
      setShowNotification(true);
    }, 50);
  }, [normalizeGameSettings]);

  const openGameSetting = useCallback(() => {
    setSettingsVisibility(true);
  }, []);

  const closeGameSetting = useCallback(() => {
    setSettingsVisibility(false);
    setTempGameSettings(gameSettings);
  }, [gameSettings]);

  const navigate = useNavigate();

  const handleSettingsOk = useCallback(() => {
    const normalizeGameSettings = formatGameSettings(tempGameSettings);
    if (
      typeof normalizeGameSettings.findingNumber === "number" &&
      normalizeGameSettings.findingNumber >= normalizeGameSettings.totalNumber!
    ) {
      setFindingNumberHelp("待寻找的福字数量必须小于总数");
      return;
    }
    setGameSettings(tempGameSettings);
    setRemainingTime(normalizeGameSettings.totalNumber! * 1000);
    window.localStorage.setItem(
      GAME_SETTINGS,
      JSON.stringify(tempGameSettings)
    );
    setSettingsVisibility(false);
    navigate(
      `${window.location.pathname}?${new URLSearchParams(
        Object.keys(tempGameSettings).reduce((result, key) => {
          if ((tempGameSettings as any)[key] !== undefined) {
            result[key] = (tempGameSettings as any)[key];
          }
          return result;
        }, {} as any)
      )}`,
      { replace: true }
    );
  }, [tempGameSettings]);

  return (
    <FuziWrapper>
      <TitleWrapper>
        <TitleZhao>找</TitleZhao>
        <TitleFu>福</TitleFu>
        <TitleZi>字</TitleZi>
      </TitleWrapper>
      <Subtitle>限定时间内</Subtitle>
      <Subtitle>找出所有逆时针旋转的福字</Subtitle>
      <Tip>
        当要找的福字&gt;=3个时，每找对一个会加时
        {(2 * ((gameSettings?.buffPercent || 100) / 100)).toFixed(1)}
        秒哦。未找到的福字&lt;3个时效果消失，好好利用吧
      </Tip>
      <Tip>
        找错福字会扣时
        {(0.5 * ((gameSettings?.debuffPercent || 100) / 100)).toFixed(1)}秒🥺
      </Tip>
      <StartButtonWrapper>
        <StartButton onClick={startGame} />
        <Flex
          justify="flex-start"
          align="center"
          onClick={openGameSetting}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <SettingButton />
          <SettingText>设置游戏</SettingText>
        </Flex>
      </StartButtonWrapper>
      <StatisticsWrapper>
        <Statistics>限时{gameSettings.timeLimit}秒</Statistics>
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
                item.isCounterclockwise ? undefined : handleClickCardIncorrectly
              }
              onTouch={
                item.isCounterclockwise
                  ? () => handleClickCardCorrectly(index)
                  : undefined
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
      <Modal
        title="游戏设置"
        visible={settingsVisibility}
        closeOnMaskClick
        actions={[
          {
            key: "cancel",
            text: "取消",
            onClick: closeGameSetting,
          },
          {
            key: "confirm",
            text: "确定",
            onClick: handleSettingsOk,
          },
        ]}
        content={
          <Form>
            <Form.Item label="时间限制(秒)">
              <Input
                type="number"
                value={tempGameSettings.timeLimit as any}
                onChange={(value) => {
                  const timeLimit = value ? parseFloat(value) : undefined;
                  setTempGameSettings(
                    produce(tempGameSettings, (draft) => {
                      draft.timeLimit = timeLimit;
                    })
                  );
                }}
                min={0.5}
                max={10000}
                maxLength={5}
              />
            </Form.Item>
            <Form.Item label="福字总数">
              <Input
                type="number"
                value={tempGameSettings.totalNumber as any}
                onChange={(value) => {
                  const totalNumber = value ? parseInt(value) : undefined;
                  setTempGameSettings(
                    produce(tempGameSettings, (draft) => {
                      draft.totalNumber = totalNumber;
                    })
                  );
                }}
                min={2}
                max={10000}
                maxLength={5}
              />
            </Form.Item>
            <Form.Item label="待寻找数量" help={findingNumberHelp}>
              <Input
                type="number"
                value={tempGameSettings.findingNumber as any}
                placeholder="每个默认3.5%概率逆时针"
                onChange={(value) => {
                  const findingNumber = value ? parseInt(value) : undefined;
                  if (
                    findingNumber &&
                    findingNumber >= tempGameSettings.totalNumber!
                  ) {
                    setFindingNumberHelp("待寻找的福字数量必须小于总数");
                  } else {
                    setFindingNumberHelp("");
                  }
                  setTempGameSettings(
                    produce(tempGameSettings, (draft) => {
                      draft.findingNumber = findingNumber;
                    })
                  );
                }}
                min={1}
                max={9999}
                maxLength={4}
              />
            </Form.Item>
            <Form.Item label="buff生效比例(%)">
              <Input
                type="number"
                placeholder="例如200则代表buff效果是200%"
                value={tempGameSettings.buffPercent as any}
                onChange={(value) => {
                  const buffPercent = value ? parseFloat(value) : undefined;
                  setTempGameSettings(
                    produce(tempGameSettings, (draft) => {
                      draft.buffPercent = buffPercent;
                    })
                  );
                }}
                min={0}
                max={100000}
                maxLength={8}
              />
            </Form.Item>
            <Form.Item label="debuff生效比例(%)">
              <Input
                type="number"
                placeholder="例如200则代表debuff效果是200%"
                value={tempGameSettings.debuffPercent as any}
                onChange={(value) => {
                  const debuffPercent = value ? parseFloat(value) : undefined;
                  setTempGameSettings(
                    produce(tempGameSettings, (draft) => {
                      draft.debuffPercent = debuffPercent;
                    })
                  );
                }}
                min={0}
                max={100000}
                maxLength={8}
              />
            </Form.Item>
          </Form>
        }
      />
    </FuziWrapper>
  );
};

export default FuziGame;
