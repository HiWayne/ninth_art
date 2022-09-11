import { FC, useCallback } from "react";
import {
  DiningTableAndSeatsComposeDiningTableOffsetX,
  DiningTableAndSeatsComposeDiningTableOffsetY,
  DiningTableAndSeatsComposeRightSeatOffsetX,
} from "../../constant";
import { ThingType } from "../../types";
import type { Seat as SeatType } from "../../entity/thing/Seat";
import { UnitEditor } from "../UnitEditor";
import { DiningTable } from "./DiningTable";
import { Seat } from "./Seat";

interface DiningTableAndSeatsComposeProps {
  x: number;
  y: number;
  level: ThingType;
  seatEntity: SeatType;
}

export const DiningTableAndSeatsCompose: FC<
  DiningTableAndSeatsComposeProps
> = ({ x, y, level, seatEntity }) => {
  const handleEntity = useCallback(
    ({ x, y }) => {
      seatEntity.setX(x);
      seatEntity.setY(y);
    },
    [seatEntity]
  );

  return (
    <UnitEditor
      x={x}
      y={y}
      render={({ x, y, onClick }) => (
        <>
          <Seat x={x} y={y} direction="right" onClick={onClick} />
          <Seat
            x={x + DiningTableAndSeatsComposeRightSeatOffsetX}
            y={y}
            direction="left"
            onClick={onClick}
          />
          <DiningTable
            x={x + DiningTableAndSeatsComposeDiningTableOffsetX}
            y={y + DiningTableAndSeatsComposeDiningTableOffsetY}
            level={level}
            onClick={onClick}
          />
        </>
      )}
      canEdit={true}
      handleEntity={handleEntity}
    ></UnitEditor>
  );
};
