import { Text } from "@inlet/react-pixi";
import dayjs from "dayjs";
import { useMemo } from "react";
import { themeColors } from "../assets/theme";

export const GameTime = ({
  time,
  x,
  y,
}: {
  time: number;
  x: number;
  y: number;
}) => {
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
    const text3 = dayjs(time).format("HH:mm");
    return `${text1} ${text2} ${text3}`;
  }, [time]);
  return (
    <Text
      x={x}
      y={y}
      text={`📅 ${timeText}`}
      style={{ fontSize: "12px", fill: [themeColors.TEXT] }}
    />
  );
};
