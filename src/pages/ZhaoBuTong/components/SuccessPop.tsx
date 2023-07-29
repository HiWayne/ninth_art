import {
  type FC,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import victory1Icon from "../assets/images/victory_1.png";
import gamePropIcon from "../assets/images/game_prop@200.gif";
import restartIcon from "../assets/images/restart.png";
import nextLevelIcon from "../assets/images/next.png";
import starIcon from "../assets/images/star.png";
import magnifierIcon from "../assets/images/magnifier.png";
import alarmClockIcon from "../assets/images/alarm_clock.png";
import { LiquidStars } from "./LiquidStars";

const TOTAL_STARS = 3;

export const SuccessPop: FC<{
  visibility: boolean;
  stars: number;
  bestStarsHistory: number;
  onNext: () => void;
  onRestart: () => void;
  gotProp: 0 | 1 | 2;
  propMoveTargetRef: RefObject<HTMLElement>;
}> = ({
  visibility,
  stars,
  bestStarsHistory,
  onNext,
  onRestart,
  gotProp,
  propMoveTargetRef,
}) => {
  const [star1Animation, setStar1Animation] = useState(false);
  const [star2Animation, setStar2Animation] = useState(false);
  const [star3Animation, setStar3Animation] = useState(false);

  const overflowValueRef = useRef("");
  const propRef = useRef<HTMLImageElement>(null);
  const liquidStarsStartDomRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (visibility) {
      overflowValueRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setStar1Animation(true);
      const timer2 = setTimeout(() => {
        setStar2Animation(true);
      }, 600);
      const timer3 = setTimeout(() => {
        setStar3Animation(true);
      }, 1200);
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

  useEffect(() => {
    if (visibility && gotProp) {
      const ANIMATION_DURATION = 1000;
      const FRAME_TIME = 16;
      let timer2: number | null = null;
      const timer = setTimeout(() => {
        if (propRef.current) {
          propRef.current.style.display = "block";
          const { top: top1, left: left1 } =
            propMoveTargetRef.current!.getBoundingClientRect();
          const { top: top2, left: left2 } =
            propRef.current.getBoundingClientRect();
          const distanceX = left1 - left2;
          const distanceY = top1 - top2;
          const distanceXFrame = Math.round(
            distanceX / (ANIMATION_DURATION / FRAME_TIME)
          );
          const distanceYFrame = Math.round(
            distanceY / (ANIMATION_DURATION / FRAME_TIME)
          );
          let currentXOffset = 0,
            currentYOffset = 0;
          timer2 = setInterval(() => {
            currentXOffset += distanceXFrame;
            currentYOffset += distanceYFrame;
            if (currentXOffset < distanceX || currentYOffset > distanceY) {
              propRef.current!.style.transform = `translate(${currentXOffset}px, ${currentYOffset}px)`;
            } else {
              clearInterval(timer2!);
              propRef.current!.style.display = "none";
            }
          }, FRAME_TIME);
        }
      }, 4200);
      return () => {
        if (propRef.current) {
          propRef.current.style.display = "none";
        }
        clearTimeout(timer);
        if (timer2 !== null) {
          clearInterval(timer2);
        }
      };
    }
  }, [visibility, gotProp]);

  const starAnimations = useMemo(
    () => [star1Animation, star2Animation, star3Animation],
    [star1Animation, star2Animation, star3Animation]
  );

  return (
    <>
      <div className="w-[100vw] h-[-webkit-fill-available] fixed top-0 left-0 z-[999] bg-[rgba(0,_0,_0,_0.6)] flex flex-col justify-center items-center">
        <LiquidStars
          count={stars}
          bestStarsHistory={bestStarsHistory}
          delay={2600}
        />
        <div className="translate-y-[120rem] flex justify-center items-center">
          {Array.from({ length: TOTAL_STARS }).map((_, index) => (
            <img
              className={`w-[160rem] opacity-0 scale-0${
                index === 1 ? " mt-[-120rem] ml-[24rem] mr-[24rem]" : ""
              }${
                starAnimations[index]
                  ? index + 1 <= stars
                    ? " animate-[0.6s_star-show_0.6s_ease-in_forwards]"
                    : " animate-[0.6s_inactive-star-show_0.6s_ease-in_forwards]"
                  : ""
              }`}
              style={
                index + 1 <= stars ? undefined : { filter: "brightness(0)" }
              }
              ref={index === 1 ? liquidStarsStartDomRef : undefined}
              key={index}
              src={starIcon}
            />
          ))}
        </div>
        <img
          className="w-[80%] opacity-0 scale-0 animate-[enlarge_0.8s_ease-in-out_forwards]"
          src={victory1Icon}
        />
        {gotProp ? (
          <div className="flex justify-start items-center translate-x-[-31rem] translate-y-[-20rem] opacity-0 animate-[0.6s_opacity-show_4s_ease-in-out_forwards]">
            <img className="w-[192rem]" src={gamePropIcon} />
            <span className="ml-[23rem] translate-y-[38rem] text-[#fff] font-bold text-[16px]">
              获得道具x1
            </span>
            <img
              ref={propRef}
              className="hidden absolute z-[99] left-[72rem] top-[calc(50%_-_36rem)] w-[60rem]"
              src={
                gotProp === 1
                  ? magnifierIcon
                  : gotProp === 2
                  ? alarmClockIcon
                  : ""
              }
            />
          </div>
        ) : null}
        <div className="mt-[23rem] flex justify-center items-center opacity-0 scale-0 animate-[enlarge_0.8s_ease-in-out_forwards]">
          <img
            className="w-[154rem] cursor-pointer"
            src={restartIcon}
            onClick={onRestart}
          />
          <img
            className="ml-[80rem] w-[154rem] cursor-pointer"
            src={nextLevelIcon}
            onClick={onNext}
          />
        </div>
      </div>
    </>
  );
};
