import styled from "styled-components";
import leftArrow from "assets/images/left_arrow.png";

export const BackButton = styled.div`
  display: inline-block;
  width: 36px;
  height: 36px;
  border: 2px solid #4a1c05;
  background: #7c3813 url("${leftArrow}") center / 28px 28px no-repeat;
  border-radius: 50%;
  cursor: pointer;
`;
