import { Sprite } from "@inlet/react-pixi";
import { FC } from "react";
import { ThingType } from "../../types";
import customizedDiningTableImage from "../../assets/images/furnish/customized-dining-table.png";
import { DiningTableHeight, DiningTableWidth } from "../../constant";

interface DiningTableProps {
  x: number;
  y: number;
  level: ThingType;
  onClick: () => void;
}

export const DiningTable: FC<DiningTableProps> = ({ x, y, level, onClick }) => {
  let image = "";
  switch (level) {
    case "customized":
      image = customizedDiningTableImage;
      break;
  }
  return (
    <Sprite
      x={x}
      y={y}
      width={DiningTableWidth}
      height={DiningTableHeight}
      image={image}
      pointerdown={onClick}
      interactive={true}
    />
  );
};
