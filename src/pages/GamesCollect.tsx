import Grid from "@/shared/components/Grid";
import Title from "@/shared/components/Title";
import fuziIcon from "assets/images/fuzi.jpeg";

const channels = [
  {
    path: "/game/fuzi",
    image: fuziIcon,
    name: "找福字",
  },
];

const GamesCollect = () => {
  return (
    <>
      <Title>所有游戏</Title>
      <Grid channels={channels} />;
    </>
  );
};

export default GamesCollect;
