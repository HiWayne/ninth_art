import { FC, useEffect, useRef } from "react";
import victory1Icon from "../assets/images/victory_1.png";
import gamePropIcon from "../assets/images/game_prop@200.gif";
import restartIcon from "../assets/images/restart.png";
import nextLevelIcon from "../assets/images/next.png";
import starIcon from "../assets/images/star.png";

const TOTAL_STARS = 3;

export const SuccessPop: FC<{
  visibility: boolean;
  stars: number;
  onNext: () => void;
  onRestart: () => void;
  gotProp: boolean;
}> = ({ visibility, stars, onNext, onRestart, gotProp }) => {
  const overflowValueRef = useRef("");

  useEffect(() => {
    if (visibility) {
      overflowValueRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflowValueRef.current;
      };
    } else {
      document.body.style.overflow = overflowValueRef.current;
    }
  }, [visibility]);

  return (
    <div
      style={visibility ? { display: "flex" } : { display: "none" }}
      className="w-[100vw] h-[-webkit-fill-available] fixed top-0 left-0 z-[999] bg-[rgba(0,_0,_0,_0.4)] flex flex-col justify-center items-center"
    >
      <div className="mb-[12rem] flex justify-center items-center">
        {Array.from({ length: TOTAL_STARS }).map((_, index) => (
          <img
            className={`w-[36rem] h-[36rem]${
              index === 1 ? " translate-y-[20rem] ml-[18rem] mr-[18rem]" : ""
            }`}
            style={index + 1 <= stars ? undefined : { filter: "brightness(0)" }}
            key={index}
            src={starIcon}
          />
        ))}
      </div>
      <img className="w-[90%]" src={victory1Icon} />
      {gotProp ? (
        <div className="flex justify-start items-center translate-x-[-16px]">
          <img className="w-[100px] h-[100px]" src={gamePropIcon} />
          <span className="ml-[12px] translate-y-[20px] text-[#fff] font-bold text-[16px]">
            获得道具x1
          </span>
        </div>
      ) : null}
      <div className="mt-[40px] flex justify-center items-center">
        <img
          className="w-[80px] cursor-pointer"
          src={restartIcon}
          onClick={onRestart}
        />
        <img
          className="ml-[60px] w-[80px] cursor-pointer"
          src={nextLevelIcon}
          onClick={onNext}
        />
      </div>
    </div>
  );
};
