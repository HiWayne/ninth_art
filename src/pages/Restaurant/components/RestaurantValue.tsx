import { ValueColumn } from "./ValueColumn";
import cashIcon from "../assets/images/icon/cash.png";
import attractiveIcon from "../assets/images/icon/attractive.png";
import impressionIcon from "../assets/images/icon/impression.png";
import safetyIcon from "../assets/images/icon/safety.png";
import serviceLevelIcon from "../assets/images/icon/serviceLevel.png";
import cookingIcon from "../assets/images/icon/cooking.png";
import { Container } from "@inlet/react-pixi";
import { FC } from "react";

interface RestaurantValueProps {
  x: number;
  y: number;
  cash: number;
  attractive: number;
  impression: number;
  safety: number;
  serviceLevel: number;
  cooking: number;
}

export const RestaurantValue: FC<RestaurantValueProps> = ({
  x,
  y,
  cash = 0,
  attractive = 0,
  impression = 0,
  safety = 0,
  serviceLevel = 0,
  cooking = 0,
}) => {
  return (
    <Container position={[x, y]}>
      <ValueColumn
        x={10}
        y={0}
        image={cashIcon}
        text="现金"
        value={cash}
        color={["#ffc802"]}
      />
      <ValueColumn
        x={10}
        y={25}
        image={attractiveIcon}
        text="吸引力"
        value={attractive}
        color={["#ffb0ff"]}
      />
      <ValueColumn
        x={10}
        y={50}
        image={impressionIcon}
        text="餐厅形象"
        value={impression}
        color={["#f2a8a4"]}
      />
      <ValueColumn
        x={10}
        y={75}
        image={safetyIcon}
        text="安全度"
        value={safety}
        color={["#b9c4ca"]}
      />
      <ValueColumn
        x={10}
        y={100}
        image={serviceLevelIcon}
        text="服务水平"
        value={serviceLevel}
        color={["#c8c8cc"]}
      />
      <ValueColumn
        x={10}
        y={125}
        image={cookingIcon}
        text="菜品水平"
        value={cooking}
        color={["#ffa68e"]}
      />
    </Container>
  );
};
