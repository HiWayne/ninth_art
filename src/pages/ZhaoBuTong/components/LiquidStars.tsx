import useStore from "@/store";
import {
  FC,
  MutableRefObject,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import starIcon from "../assets/images/star.png";

export const LiquidStars: FC<{
  count: number;
  bestStarsHistory: number;
  delay: number;
}> = ({ count, bestStarsHistory, delay }) => {
  const totalStars = useStore((state) => state.zhaoBuTong.totalStars);

  const number = useMemo(
    () => Math.max(count - bestStarsHistory, 0),
    [count, bestStarsHistory]
  );

  const [changedTotalStars, setChangedTotalStars] = useState(
    totalStars - number
  );
  const [show, setShow] = useState(false);

  const targetRef = useRef<HTMLImageElement>(null);
  const starRefs: MutableRefObject<HTMLImageElement[]> = useRef([]);

  useEffect(() => {
    if (number <= 0) {
      return;
    }
    const ANIMATION_DURATION = 1000;
    const FRAME_TIME = 16;
    const timeoutTimers: number[] = [];
    const intervalTimers: number[] = [];
    const timer1 = setTimeout(() => {
      setShow(true);
      const { top: top1, left: left1 } =
        targetRef.current!.getBoundingClientRect();
      starRefs.current.forEach((dom, index) => {
        timeoutTimers[index] = setTimeout(() => {
          const { top: top2, left: left2 } = dom.getBoundingClientRect();
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
          intervalTimers[index] = setInterval(() => {
            currentXOffset += distanceXFrame;
            currentYOffset += distanceYFrame;
            if (currentXOffset < distanceX || currentYOffset > distanceY) {
              dom.style.left = `${currentXOffset}px`;
              dom.style.top = `${currentYOffset}px`;
            } else {
              clearInterval(intervalTimers[index]);
              dom.style.display = "none";
              setChangedTotalStars((stars) => stars + 1);
            }
          }, FRAME_TIME);
        }, index * 200);
      });
    }, delay);
    const timer2 = setTimeout(() => {
      setShow(false);
    }, delay + (number - 1) * 200 + ANIMATION_DURATION + 200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      timeoutTimers.forEach((timer) => {
        clearTimeout(timer);
      });
      intervalTimers.forEach((timer) => {
        clearInterval(timer);
      });
    };
  }, []);

  return (
    <>
      <div className="absolute top-[36rem] right-[92rem] flex justify-start items-center">
        <img
          ref={targetRef}
          className="inline-block w-[64rem]"
          src={starIcon}
        />
        <span
          className="ml-[4rem] font-[Skranji-Bold] text-[28px] text-[#fff]"
          style={{ WebkitTextStroke: "2px #3a230a" }}
        >
          {changedTotalStars}
        </span>
      </div>
      <div
        style={
          show
            ? { opacity: 1, left: "360rem", top: "550rem" }
            : { opacity: 0, left: "360rem", top: "550rem" }
        }
        className="absolute z-[99] w-[32rem] h-[30.6rem]"
      >
        {Array.from({ length: number }).map((_, index) => (
          <img
            className="absolute z-[99] top-0 left-0 inline-block w-[100%] animate-[star-rotate_0.5s_linear_infinite]"
            key={index}
            ref={(dom) => {
              starRefs.current[index] = dom!;
            }}
            src={starIcon}
          />
        ))}
      </div>
    </>
  );
};
