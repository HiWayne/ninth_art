import { FC } from "react";
import dotActiveIcon from "../../assets/images/levels/dot_selected.png";
import dotInActiveIcon from "../../assets/images/levels/dot.png";

const Dot: FC<{ active: boolean; marginLeft: number }> = ({
  active,
  marginLeft,
}) => {
  return (
    <img
      style={marginLeft ? { marginLeft: `${marginLeft}rem` } : undefined}
      className={`${active ? "w-[10rem]" : "w-[8rem]"} cursor-pointer`}
      src={active ? dotActiveIcon : dotInActiveIcon}
    />
  );
};

export const Pagination: FC<{ currentPage: number; totalPage: number }> = ({
  currentPage,
  totalPage,
}) => {
  return (
    <div className="flex justify-start items-center absolute left-[50%] bottom-[46rem] translate-x-[-50%]">
      {Array.from({ length: totalPage }).map((_, index) => (
        <Dot
          key={index}
          active={currentPage === index}
          marginLeft={index !== 0 ? 6 : 0}
        />
      ))}
    </div>
  );
};
