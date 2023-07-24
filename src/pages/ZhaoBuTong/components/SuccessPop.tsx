import styled from "styled-components";

export const SuccessPop = styled(({ className }) => {
  return (
    <div className={className}>
      <img src="" />
    </div>
  );
})`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  z-index: 999;
  & > img {
    display: inline-block;
    width: 100%;
  }
`;
