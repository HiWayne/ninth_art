import styled from "styled-components";

const Tip = styled.p`
  position: relative;
  margin: 8px auto;
  padding-left: 10px;
  width: 260px;
  font-size: 12px;
  line-height: 14px;
  color: #999;

  &::before {
    content: "*";
    position: absolute;
    left: 0;
    top: 3px;
  }
`;

export default Tip;
