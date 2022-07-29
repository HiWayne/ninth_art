import styled from "styled-components";
import RestartButton from "./shared/components/RestartButton";
import Icon from "shared/components/Icon";
import failIcon from "assets/images/fail.jpg";
import useStore from "@/store";
import { useMemo } from "react";
import { getFailText } from "./shared/utils/getFailText";
import LineText from "./shared/components/LineText";
import LineWhiteTitle from "./shared/components/LineWhiteTitle";
import RedText from "./shared/components/RedText";

const TextWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Content = styled(({ className }) => {
  const speededTime = useStore((state) => state.fuzi.speededTime);
  const totalCount = useStore((state) => state.fuzi.totalCount);
  const countNoFind = useStore((state) => state.fuzi.countNoFind);

  const findCount = useMemo(
    () => totalCount - countNoFind,
    [totalCount, countNoFind]
  );

  const failText = useMemo(
    () => getFailText(findCount, totalCount, speededTime),
    [findCount, totalCount, speededTime]
  );

  return (
    <div className={className}>
      <LineWhiteTitle>{failText}</LineWhiteTitle>
      <div>
        <Icon src={failIcon} width={100} />
        <TextWrapper>
          <LineText>本次找到了{findCount}个福字</LineText>
          <LineText>
            还有<RedText>{countNoFind}</RedText>个没找到
          </LineText>
          <LineText>再接再厉^_^</LineText>
        </TextWrapper>
      </div>
    </div>
  );
})`
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const Fail = styled(({ className }) => {
  return (
    <div className={className}>
      <Content />
      <RestartButton>再来一次</RestartButton>
    </div>
  );
})`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  animation: Show 0.5s linear;
  transform-origin: center;
  background-color: rgba(0, 0, 0, 0.9);

  @keyframe Show {
    0% {
      opacity: 0;
      transform: scale(0.6);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default Fail;
