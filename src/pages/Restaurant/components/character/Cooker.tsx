import { randomNumber } from "@/shared/utils";
import { Sprite, Text } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import cookerImage1 from "../../assets/images/cooker/cooker_1_64.png";
import cookerImage2 from "../../assets/images/cooker/cooker_2_64.png";
import cookerImage3 from "../../assets/images/cooker/cooker_3_64.png";
import cookerImage4 from "../../assets/images/cooker/cooker_4_64.png";
import { CookerHeight, CookerWidth } from "../../constant";
import type { Cooker as CookerType } from "../../entity";

const cookerImageMap = {
  1: cookerImage1,
  2: cookerImage2,
  3: cookerImage3,
  4: cookerImage4,
};

export const Cooker = ({
  x,
  y,
  data,
}: {
  x: number;
  y: number;
  data: CookerType;
}) => {
  const [direction, setDirection] = useState<1 | 2 | 3 | 4>(
    randomNumber(1, 4) as 1 | 2 | 3 | 4
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection((direction) =>
        direction === 4 ? 1 : ((direction + 1) as 2 | 3 | 4)
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Text text={data.name} />
      <Sprite
        x={x}
        y={y}
        width={CookerWidth}
        height={CookerHeight}
        image={cookerImageMap[direction]}
      />
    </>
  );
};
