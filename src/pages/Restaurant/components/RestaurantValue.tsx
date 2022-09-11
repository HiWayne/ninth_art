import { ValueColumn } from "./ValueColumn";
import cashIcon from "../assets/images/icon/cash.png";
import attractiveIcon from "../assets/images/icon/attractive.png";
import impressionIcon from "../assets/images/icon/impression.png";
import safetyIcon from "../assets/images/icon/safety.png";
import serviceLevelIcon from "../assets/images/icon/serviceLevel.png";
import cookingIcon from "../assets/images/icon/cooking.png";
import { Container } from "@inlet/react-pixi";
import { FC, useEffect } from "react";
import { useForceUpdateOnDemand, useNewest } from "@/shared/hooks/index";
import { createAnimate } from "@/shared/utils";
import useStore from "@/store";
import shallow from "zustand/shallow";

interface RestaurantValueProps {
  x: number;
  y: number;
  position: [number, number];
}

export const RestaurantValue: FC<RestaurantValueProps> = ({
  x,
  y,
  position,
}) => {
  const [attractive, safety, serviceLevel, cooking, cash, impression] =
    useStore(
      (state) => [
        state.restaurant.restaurant!.attractive,
        state.restaurant.restaurant!.safety,
        state.restaurant.restaurant!.serviceLevel,
        state.restaurant.restaurant!.cooking,
        state.restaurant.restaurant!.getCash(),
        state.restaurant.restaurant!.getImpression(),
      ],
      shallow
    );

  const updater = useNewest(
    useForceUpdateOnDemand([
      cash,
      attractive,
      impression,
      safety,
      serviceLevel,
      cooking,
    ])
  );

  useEffect(() => {
    const animate = createAnimate(() => {
      updater();
    });

    const stop = animate();

    return stop;
  }, []);

  return (
    <Container
      position={position}
      rotation={Math.PI / 2}
      x={window.innerWidth - 20}
      y={(x / window.innerWidth) * window.innerHeight}
    >
      <ValueColumn
        x={0}
        y={0}
        image={cashIcon}
        text="现金"
        value={cash}
        color={["#ffc802"]}
      />
      <ValueColumn
        x={0}
        y={25}
        image={attractiveIcon}
        text="吸引力"
        value={attractive}
        color={["#ffb0ff"]}
      />
      <ValueColumn
        x={0}
        y={50}
        image={impressionIcon}
        text="餐厅形象"
        value={impression}
        color={["#f2a8a4"]}
      />
      <ValueColumn
        x={0}
        y={75}
        image={safetyIcon}
        text="安全度"
        value={safety}
        color={["#b9c4ca"]}
      />
      <ValueColumn
        x={0}
        y={100}
        image={serviceLevelIcon}
        text="服务水平"
        value={serviceLevel}
        color={["#c8c8cc"]}
      />
      <ValueColumn
        x={0}
        y={125}
        image={cookingIcon}
        text="菜品水平"
        value={cooking}
        color={["#ffa68e"]}
      />
    </Container>
  );
};
