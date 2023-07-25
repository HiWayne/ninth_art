import { CSSProperties, FC } from "react";
import styled from "styled-components";
import starIcon from "assets/images/star.png";

export const Star = styled<FC<{ className?: string; light: boolean; size: number }>>(
  ({ className }) => {
    return <div className={className} />;
  }
)`
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: url("${starIcon}") center / contain no-repeat;
  ${(props) => (!props.light ? "filter: brightness(0);" : "")}
  & + & {
    margin-left: 4px;
  }
`;

export const Stars = styled<
  FC<{
    className?: string;
    counts: number;
    style?: CSSProperties;
    size?: number;
  }>
>(({ className, counts, style, size = 24 }) => {
  return (
    <div className={className} style={style}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Star key={index} light={index < counts} size={size} />
      ))}
    </div>
  );
})`
  display: flex;
  justify-content: center;
  align-items: center;
`;
