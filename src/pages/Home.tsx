import { FC } from "react";
import styled from "styled-components";
import Grid from "@/shared/components/Grid";
import Title from "@/shared/components/Title";
import gameIcon from "assets/game.svg";

const channels = [
  {
    image: gameIcon,
    name: "小游戏",
    path: "/game",
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Home: FC = () => (
  <Wrapper>
    <Title>第九艺术 Ninth Art</Title>
    <Grid channels={channels} />
  </Wrapper>
);

export default Home;
