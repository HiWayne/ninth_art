import { FC } from "react";
import styled from "styled-components";
import Grid from "@/shared/components/Grid";
import Title from "@/shared/components/Title";
import gameIcon from "assets/images/game.svg";
import toolIcon from "assets/images/tool.svg";

const channels = [
  {
    image: gameIcon,
    name: "游戏",
    path: "/game",
  },
  {
    image: toolIcon,
    name: "创意工具",
    path: "/tools",
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
    <Title style={{ color: "#F56C6C", fontSize: "22px", marginBottom: "10px" }}>
      Ninth Art
    </Title>
    <Title style={{ color: "#F56C6C", fontSize: "14px", marginTop: "0px" }}>
      第九艺术
    </Title>
    <Grid channels={channels} />
  </Wrapper>
);

export default Home;
