import { FC, ReactElement } from "react";
import styled from "styled-components";

interface FlexProps {
  className?: string;
  style?: Object;
  inline?: boolean;
  direction?: "row" | "column";
  wrap?: boolean;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-between";
  align?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-between";
  children: ReactElement | ReactElement[];
}

export const Flex = styled<FC<FlexProps>>(
  ({ className, style, inline, direction, wrap, justify, align, children }) => {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
)`
  display: ${(props) => (props.inline ? "inline-flex" : "flex")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
`;
