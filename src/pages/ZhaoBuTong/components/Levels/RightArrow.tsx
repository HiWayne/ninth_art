import arrowActiveIcon from "../../assets/images/levels/arrow_active.png";
import arrowInActiveRightIcon from "../../assets/images/levels/arrow_inactive_right.png";
import { FC } from "react";

export const RightArrow: FC<{ active: boolean; onClick: () => void }> = ({
  active,
  onClick,
}) => {
  return (
    <img
      className={`absolute w-[80rem] right-[-20rem] top-[calc(50%_+_16rem)] translate-y-[-50%] cursor-pointer${
        active ? "" : " rotate-y-180"
      }`}
      src={active ? arrowActiveIcon : arrowInActiveRightIcon}
      onClick={onClick}
    />
  );
};
