import { FC, useEffect, useMemo, useRef, useState } from "react";
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
  const [star1Animation, setStar1Animation] = useState(false);
  const [star2Animation, setStar2Animation] = useState(false);
  const [star3Animation, setStar3Animation] = useState(false);

  const overflowValueRef = useRef("");

  useEffect(() => {
    if (visibility) {
      overflowValueRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setStar1Animation(true);
      const timer2 = setTimeout(() => {
        setStar2Animation(true);
      }, 800);
      const timer3 = setTimeout(() => {
        setStar3Animation(true);
      }, 1600);
      return () => {
        document.body.style.overflow = overflowValueRef.current;
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      document.body.style.overflow = overflowValueRef.current;
      setStar1Animation(false);
      setStar2Animation(false);
      setStar3Animation(false);
    }
  }, [visibility]);

  const starAnimations = useMemo(
    () => [star1Animation, star2Animation, star3Animation],
    [star1Animation, star2Animation, star3Animation]
  );

  return (
    <div
      style={visibility ? { display: "flex" } : { display: "none" }}
      className="w-[100vw] h-[-webkit-fill-available] fixed top-0 left-0 z-[999] bg-[rgba(0,_0,_0,_0.4)] flex flex-col justify-center items-center"
    >
      <div className="translate-y-[120rem] flex justify-center items-center">
        {Array.from({ length: TOTAL_STARS }).map((_, index) => (
          <img
            className={`w-[160rem] opacity-0 scale-0${
              index === 1 ? " mt-[-120rem] ml-[24rem] mr-[24rem]" : ""
            }${
              starAnimations[index]
                ? index + 1 <= stars
                  ? " animate-[0.6s_star-show_0.8s_ease-in-out_forwards]"
                  : " animate-[0.6s_inactive-star-show_0.8s_ease-in-out_forwards]"
                : ""
            }`}
            style={index + 1 <= stars ? undefined : { filter: "brightness(0)" }}
            key={index}
            src={starIcon}
          />
        ))}
      </div>
      <img
        className="w-[80%] opacity-0 scale-0 animate-[inactive-star-show_1s_ease-in-out_forwards]"
        src={victory1Icon}
      />
      {gotProp ? (
        <div className="flex justify-start items-center translate-x-[-16px] translate-y-[-20rem] opacity-0 animate-[1s_opacity-show_3s_ease-in-out_forwards]">
          <img className="w-[100px] h-[100px]" src={gamePropIcon} />
          <span className="ml-[12px] translate-y-[20px] text-[#fff] font-bold text-[16px]">
            获得道具x1
          </span>
        </div>
      ) : null}
      <div className="mt-[12px] flex justify-center items-center opacity-0 scale-0 animate-[inactive-star-show_1s_ease-in-out_forwards]">
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
