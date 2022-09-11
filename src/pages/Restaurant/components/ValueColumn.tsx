import { Container, Sprite, Text } from "@inlet/react-pixi";
import { FC } from "react";

interface ValueColumnProps {
  x: number;
  y: number;
  image: string;
  text: string;
  value: number;
  color: string[];
}

export const ValueColumn: FC<ValueColumnProps> = ({
  x,
  y,
  image,
  text,
  value,
  color,
}) => {
  return (
    <Container position={[x, y]}>
      <Sprite x={0} y={0} image={image} width={20} height={20}></Sprite>
      <Text
        x={25}
        y={4}
        text={`${text}：${value}`}
        style={{ fontSize: "12px", fill: color }}
      ></Text>
    </Container>
  );
};
