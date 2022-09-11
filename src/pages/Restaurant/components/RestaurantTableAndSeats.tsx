import useStore from "@/store";
import { Container } from "@inlet/react-pixi";
import { useRestaurantPosition } from "../hooks";
import { DiningTableAndSeatsCompose } from "./furnish";

export const RestaurantTableAndSeats = () => {
  const seats = useStore((state) => state.restaurant.restaurant?.seats);
  const position = useRestaurantPosition();
  return (
    <Container position={position}>
      {seats?.map((seat, index) => {
        const x = seat.getX();
        const y = seat.getY();
        const level = seat.type;
        return (
          <DiningTableAndSeatsCompose
            x={x}
            y={y}
            key={index}
            level={level}
            seatEntity={seat}
          />
        );
      }) || null}
    </Container>
  );
};
