import styled from "styled-components";
import loadingIcon from "assets/images/loading.svg";

export const Loading = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 48px;
  height: 48px;
  background: url("${loadingIcon}") center / cover no-repeat;
  animation: 2s Round linear infinite;

  @keyframes Round {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
