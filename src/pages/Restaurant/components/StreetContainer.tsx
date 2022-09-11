import { Container } from "@inlet/react-pixi";

export const StreetContainer = ({
  x = 0,
  y = 0,
  children,
}: {
  x?: number;
  y?: number;
  children: JSX.Element;
}) => {
  return <Container position={[x, y]}>{children}</Container>;
};
