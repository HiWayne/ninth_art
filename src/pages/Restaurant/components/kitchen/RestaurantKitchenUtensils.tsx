import kitchenUtensils1Image from "../../assets/images/furnish/kitchen/kitchen-utensils-1.png";
import kitchenUtensils2Image from "../../assets/images/furnish/kitchen/kitchen-utensils-2.png";
import kitchenUtensils3Image from "../../assets/images/furnish/kitchen/kitchen-utensils-3.png";
import kitchenUtensils4Image from "../../assets/images/furnish/kitchen/kitchen-utensils-4.png";
import kitchenUtensils5Image from "../../assets/images/furnish/kitchen/kitchen-utensils-5.png";
import kitchenUtensils6Image from "../../assets/images/furnish/kitchen/kitchen-utensils-6.png";
import kitchenUtensils7Image from "../../assets/images/furnish/kitchen/kitchen-utensils-7.png";
import kitchenUtensils8Image from "../../assets/images/furnish/kitchen/kitchen-utensils-8.png";
import kitchenUtensils9Image from "../../assets/images/furnish/kitchen/kitchen-utensils-9.png";
import kitchenUtensils10Image from "../../assets/images/furnish/kitchen/kitchen-utensils-10.png";
import { KitchenUtensil } from "./KitchenUtensil";
import { Container } from "@inlet/react-pixi";
import {
  FenceWidth,
  KitchenUtensilHeight,
  KitchenUtensilWidth,
  VerticalWashbasinHeight1,
  VerticalWashbasinHeight2,
  VerticalWashbasinWidth,
} from "../../constant";
import useStore from "@/store";

const HorizontalKitchenUtensilsImages = [
  kitchenUtensils1Image,
  kitchenUtensils2Image,
  kitchenUtensils3Image,
  kitchenUtensils4Image,
  kitchenUtensils5Image,
];

const VerticalKitchenUtensilsImages = [
  kitchenUtensils7Image,
  kitchenUtensils8Image,
  kitchenUtensils9Image,
  kitchenUtensils10Image,
];

export const RestaurantKitchenUtensils = () => {
  const kitchenUtensils =
    useStore((state) => state.restaurant.restaurant?.kitchenUtensils) || [];

  return (
    <Container position={[0, 0]}>
      {kitchenUtensils.length <= 5
        ? kitchenUtensils.map((_, index) => (
            <KitchenUtensil
              x={index * KitchenUtensilWidth + FenceWidth * 2}
              y={0}
              key={index}
              image={HorizontalKitchenUtensilsImages[index]}
            />
          ))
        : new Array(5)
            .fill(true)
            .map((_, index) => (
              <KitchenUtensil
                x={index * KitchenUtensilWidth + FenceWidth * 2}
                y={0}
                key={index}
                image={HorizontalKitchenUtensilsImages[index]}
              />
            ))}
      {kitchenUtensils.length >= 6 ? (
        <KitchenUtensil
          x={5 * KitchenUtensilWidth + FenceWidth * 2}
          y={0}
          height={VerticalWashbasinHeight1}
          image={kitchenUtensils6Image}
        />
      ) : null}
      {kitchenUtensils.length >= 7 ? (
        <KitchenUtensil
          x={5 * KitchenUtensilWidth + FenceWidth * 2.23}
          y={VerticalWashbasinHeight1}
          width={VerticalWashbasinWidth}
          height={VerticalWashbasinHeight2}
          image={VerticalKitchenUtensilsImages[0]}
        />
      ) : null}
      {kitchenUtensils.length >= 8 ? (
        <KitchenUtensil
          x={5 * KitchenUtensilWidth + FenceWidth * 2.23}
          y={VerticalWashbasinHeight1 + VerticalWashbasinHeight2}
          width={VerticalWashbasinWidth}
          height={VerticalWashbasinHeight2}
          image={VerticalKitchenUtensilsImages[1]}
        />
      ) : null}
      {kitchenUtensils.length >= 9 ? (
        <KitchenUtensil
          x={0}
          y={0}
          width={VerticalWashbasinWidth}
          height={VerticalWashbasinHeight2}
          image={VerticalKitchenUtensilsImages[0]}
        />
      ) : null}
      {kitchenUtensils.length >= 10 ? (
        <KitchenUtensil
          x={0}
          y={VerticalWashbasinHeight2}
          width={VerticalWashbasinWidth}
          height={VerticalWashbasinHeight2}
          image={VerticalKitchenUtensilsImages[1]}
        />
      ) : null}
      {kitchenUtensils.length >= 11 ? (
        <KitchenUtensil
          x={0}
          y={VerticalWashbasinHeight2 * 2}
          width={VerticalWashbasinWidth}
          height={VerticalWashbasinHeight2}
          image={VerticalKitchenUtensilsImages[2]}
        />
      ) : null}
      {kitchenUtensils.length >= 12 ? (
        <KitchenUtensil
          x={0}
          y={VerticalWashbasinHeight2 * 3}
          width={VerticalWashbasinWidth}
          height={VerticalWashbasinHeight2}
          image={VerticalKitchenUtensilsImages[3]}
        />
      ) : null}
    </Container>
  );
};
