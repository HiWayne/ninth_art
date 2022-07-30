import styled from "styled-components";
import zhaoFont from "assets/fonts/zhao.otf";
import fuFont from "assets/fonts/fu.otf";
import ziFont from "assets/fonts/zi.otf";

export const TitleZhao = styled.span`
  @font-face {
    font-family: "zhao";
    src: url("${zhaoFont}");
  }
  @font-face {
    font-family: "fu";
    src: url("${fuFont}");
  }
  font-family: zhao;
`;

export const TitleFu = styled.span`
  @font-face {
    font-family: "fu";
    src: url("${fuFont}");
  }
  font-family: fu;
`;

export const TitleZi = styled.span`
  @font-face {
    font-family: "zi";
    src: url("${ziFont}");
  }
  font-family: zi;
`;

export const TitleWrapper = styled.h1`
  margin: 12px 0;
  font-size: 48px;
  text-align: center;
  color: rgb(246, 87, 55);
`;
