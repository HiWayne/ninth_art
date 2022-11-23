import { Text } from "@inlet/react-pixi";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { themeColors } from "../assets/theme";
import useStore from "@/store";

export const GameTime = ({ x, y }: { x: number; y: number }) => {
  const game = useStore((state) => state.restaurant.game);

  const [time, setTime] = useState(game.getCurrentTimeInGame());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(game.getCurrentTimeInGame());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const timeText = useMemo(() => {
    const text1 = dayjs(time).format("YYYY年MM月DD日");
    let text2 = "";
    switch (dayjs(time).day()) {
      case 0:
        text2 = "星期天";
        break;
      case 1:
        text2 = "星期一";
        break;
      case 2:
        text2 = "星期二";
        break;
      case 3:
        text2 = "星期三";
        break;
      case 4:
        text2 = "星期四";
        break;
      case 5:
        text2 = "星期五";
        break;
      case 6:
        text2 = "星期六";
        break;
    }
    const text3 = dayjs(time).format("HH时");
    return `${text1} ${text2} ${text3}`;
  }, [time]);
  return (
    <Text
      x={window.innerWidth - (y / window.innerHeight) * x}
      y={(x / window.innerWidth) * window.innerHeight}
      rotation={Math.PI / 2}
      text={`📅 ${timeText}`}
      style={{ fontSize: "12px", fill: [themeColors.TEXT] }}
    />
  );
};
