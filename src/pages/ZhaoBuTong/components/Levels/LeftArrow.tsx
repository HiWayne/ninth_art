import arrowActiveIcon from "../../assets/images/levels/arrow_active_left.png";
import arrowInActiveIcon from "../../assets/images/levels/arrow_inactive.png";
import { FC } from "react";

export const LeftArrow: FC<{ active: boolean; onClick: () => void }> = ({
  active,
  onClick,
}) => {
  return (
    <img
      className="absolute w-[80rem] left-[-20rem] top-[calc(50%_+_16rem)] translate-y-[-50%] cursor-pointer transition-none"
      src={active ? arrowActiveIcon : arrowInActiveIcon}
      onClick={onClick}
    />
  );
};
