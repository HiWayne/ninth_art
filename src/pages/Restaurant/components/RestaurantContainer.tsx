import { Container } from "@inlet/react-pixi";

export const RestaurantContainer = ({
  position,
  children,
  sortableChildren,
}: {
  position: [number, number];
  children: JSX.Element | JSX.Element[];
  sortableChildren: boolean;
}) => {
  return (
    <Container
      width={window.innerHeight}
      height={window.innerWidth}
      position={position}
      rotation={Math.PI / 2}
      x={window.innerWidth}
      y={0}
      sortableChildren={sortableChildren}
    >
      {children}
    </Container>
  );
};
