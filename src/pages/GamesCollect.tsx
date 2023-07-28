import Grid from "@/shared/components/Grid";
import Title from "@/shared/components/Title";
import fuziIcon from "assets/images/fuzi.jpeg";
import wenZiZhaoBuTongIcon from "assets/images/wen_zi_zhao_bu_tong.jpeg";

const channels = [
  {
    path: "/games/zhaobutong",
    image: wenZiZhaoBuTongIcon,
    name: "文字找不同",
  },
  {
    path: "/games/fuzi",
    image: fuziIcon,
    name: "淘气的福字",
  },
  // {
  //   path: "/game/restaurant",
  //   image: fuziIcon,
  //   name: "开餐厅",
  // },
];

const GamesCollect = () => {
  return (
    <>
      <Title>所有游戏</Title>
      <Grid channels={channels} />
    </>
  );
};

export default GamesCollect;
