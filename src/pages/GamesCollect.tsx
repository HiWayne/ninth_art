import Grid from "@/shared/components/Grid";
import Title from "@/shared/components/Title";
import styled from "styled-components";

const channels = [
  {
    path: "/game/fuzi",
    image: "/src/assets/fuzi.jpeg",
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
