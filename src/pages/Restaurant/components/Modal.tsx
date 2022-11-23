import { MutableRefObject, ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  padding-bottom: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Confirm = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  margin: auto;
  width: 60px;
  height: 30px;
  background-color: yellow;
  border: none;
  color: #fff;
  font-size: 14px;
`;

export const Modal = ({
  children,
  onClose,
}: {
  children: ReactElement;
  onClose: () => void;
}) => {
  console.log(onClose)
  const wrapperRef: MutableRefObject<HTMLDivElement> = useRef(null as any);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      wrapperRef.current.addEventListener("touchmove", (e) => {
        e.stopPropagation();
      });
    }

    return () => {
      console.log('remove')
      if (wrapperRef.current) {
        wrapperRef.current.remove();
      }
    };
  }, []);

  return createPortal(
    <Wrapper ref={wrapperRef}>
      <Content>
        {children}
        <Confirm onClick={onClose}>确定</Confirm>
      </Content>
    </Wrapper>,
    document.body
  );
};
