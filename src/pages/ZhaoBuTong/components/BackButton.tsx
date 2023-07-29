import styled from "styled-components";
import leftArrow from "../assets/images/left_arrow.png";

export const BackButton = styled.div`
  display: inline-block;
  width: 69rem;
  height: 69rem;
  border: 2px solid #4a1c05;
  background: #7c3813 url("${leftArrow}") center / 54rem 54rem no-repeat;
  border-radius: 50%;
  cursor: pointer;
`;
