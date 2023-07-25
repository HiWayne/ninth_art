import styled from "styled-components";

export const SuccessPop = styled(
  ({ className, visibility, onNext, onRestart }) => {
    return (
      <div
        style={visibility ? { display: "block" } : { display: "none" }}
        className={className}
      >
        <img src="" />
      </div>
    );
  }
)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  z-index: 999;
  background: #fff;
  & > img {
    display: inline-block;
    width: 100%;
  }
`;
