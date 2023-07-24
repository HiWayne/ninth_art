import { FC } from "react";
import styled from "styled-components";

export type NotificationTypeEnum = "good" | "bad";

interface NotificationProps {
  className?: string;
  show: boolean;
  text: string;
  type: NotificationTypeEnum;
}

const Notification = styled<FC<NotificationProps>>(
  ({ className, show, text, type }) => {
    return show ? <div className={className}>{text}</div> : null;
  }
)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  margin: auto;
  padding: 8px 12px;
  width: fit-content;
  text-align: center;
  animation: ShowAndHide 1.5s ease-out;
  color: ${(props) =>
    props.type === "good"
      ? "#f56c6c"
      : props.type === "bad"
      ? "#909399"
      : "inherit"};
  background: #fff;
  opacity: 0;
  z-index: 10;
  font-size: 14px;
  font-weight: bolder;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @keyframes ShowAndHide {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    20%,
    80% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

export default Notification;
