import { FC, MouseEventHandler, ReactNode, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { ReactComponent as CloseSVG } from "../../../pages/Restaurant/assets/images/close.svg";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 41, 51, 0.45);
  transition: opacity 0.25s ease-in-out;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Content = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: var(--WHITE);
  box-shadow: 0 0 0 1px rgba(64, 87, 109, 0.07),
    0 2px 18px rgba(47, 64, 80, 0.25);
`;

const CloseButton = styled(({ className, onClick }) => (
  <button type="button" className={className} onClick={onClick}>
    <span>
      <CloseSVG />
    </span>
  </button>
))`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(calc(100% + 8px));
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(17, 23, 29, 0.6);
  border: none;
  border-radius: 50%;

  &:hover {
    background-color: rgba(17, 23, 29, 0.8);
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
  }
`;

interface ModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  children: ReactNode | ReactNode[];
}

export const Modal: FC<ModalProps> = ({ show, setShow, children }) => {
  const wrapperRef = useRef(null);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const stopPropagation = useCallback<MouseEventHandler>((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (!show) {
      if (wrapperRef.current) {
        document.body.removeChild(wrapperRef.current);
      }
    }
  }, [show]);

  return show
    ? createPortal(
        <Wrapper onClick={handleClose} ref={wrapperRef}>
          <Content onClick={stopPropagation}>
            {children}
            <CloseButton onClick={handleClose} />
          </Content>
        </Wrapper>,
        document.body
      )
    : null;
};
