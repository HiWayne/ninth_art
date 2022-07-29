import styled from "styled-components";
import cuteFont from "assets/fonts/cute.ttf";

const Title = styled.h1`
  @font-face {
    font-family: "cute";
    src: url("${cuteFont}");
  }
  margin: 12px 0;
  font-family: cute;
  font-size: 48px;
  text-align: center;
  color: rgb(246, 87, 55);
`;

export default Title;
