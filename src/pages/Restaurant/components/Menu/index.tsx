import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import leftArrowIcon from "../../assets/images/icon/leftArrow.svg";

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 200px;
  height: 100vw;
  transform: translate(-50%, calc(100vw / 2 - 100px)) rotate(90deg);
  transform-origin: center;
  transition: all 0.2s ease-in;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f4d059;
`;

const LeftArrow = styled.img.attrs({
  src: leftArrowIcon,
})`
  position: absolute;
  left: -48px;
  top: 50%;
  transform: translate(0, -50%);
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center;
`;

export const Menu = () => {
  const [expand, setExpand] = useState(true);

  const rightStyle = useMemo(
    () => (expand ? { bottom: 0 } : { bottom: "-200px" }),
    [expand]
  );

  const toggle = useCallback(() => {
    setExpand((expand) => !expand);
  }, []);

  return (
    <Wrapper style={rightStyle}>
      <Content />
      <LeftArrow onClick={toggle} />
    </Wrapper>
  );
};

// 营业、闭店、雇佣、人员管理（解雇、加薪、学习）、贷款、餐厅详细情况
