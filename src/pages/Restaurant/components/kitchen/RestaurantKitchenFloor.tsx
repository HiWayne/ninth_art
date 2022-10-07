import { useMemo } from "react";
import { FenceWidth } from "../../constant";
import { useMutableVerticalFenceCount } from "../../hooks";
import { Floor } from "../Floor";
import grayFloorImage from "../../assets/images/furnish/floor/gray-floor.png";

export const RestaurantKitchenFloor = () => {


  const kitchenRows = useMemo(() => {
    return 6;
  }, []);

  const kitchenColumns = useMemo(() => {
    return 8;
  }, []);

  return (
    <Floor
      x={0}
      y={0}
      rows={kitchenRows}
      columns={kitchenColumns}
      image={grayFloorImage}
      zIndex={-8}
    />
  );
};
