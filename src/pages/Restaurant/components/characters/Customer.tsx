import { Sprite } from "@inlet/react-pixi";
import { FC, useEffect } from "react";
import type { Customer as CustomerClass } from "../../entity";

export const Customer: FC<{ data: CustomerClass }> = ({ data }) => {
  const x = data.getX();
  const y = data.getY();

  useEffect(() => {
    data.walk();
  }, []);

  return <Sprite scale={0.5} x={x} y={y} image={data.ui} />;
};
