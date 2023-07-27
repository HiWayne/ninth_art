import { FC, useEffect, useRef, useState } from "react";
import failIcon from "../assets/images/fail.png";
import restartIcon from "../assets/images/restart.png";
import starIcon from "../assets/images/star.png";

const TOTAL_STARS = 3;

export const FailPop: FC<{ visibility: boolean; onClick: () => void }> = ({
  visibility,
  onClick,
}) => {
  const [animation, setAnimation] = useState(false);
  const overflowValueRef = useRef("");

  useEffect(() => {
    if (visibility) {
      setAnimation(true);
      overflowValueRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflowValueRef.current;
      };
    } else {
      document.body.style.overflow = overflowValueRef.current;
      setAnimation(false);
    }
  }, [visibility]);

  return (
    <div
      style={visibility ? { display: "flex" } : { display: "none" }}
      className={
        "flex flex-col justify-center items-center fixed left-0 top-0 z-[999] bg-[rgba(0,_0,_0,_0.4)] w-[100vw] h-[-webkit-fill-available]"
      }
    >
      <div
        className={`translate-y-[60rem] flex justify-center items-center opacity-0 scale-0${
          animation
            ? " animate-[1s_inactive-star-show_1s_ease-in-out_forwards]"
            : ""
        }`}
      >
        {Array.from({ length: TOTAL_STARS }).map((_, index) => (
          <img
            className={`w-[160rem]${
              index === 1 ? " translate-y-[-80rem] ml-[24rem] mr-[24rem]" : ""
            }`}
            style={{ filter: "brightness(0)" }}
            key={index}
            src={starIcon}
          />
        ))}
      </div>
      <img
        className="w-[90%] ml-[16px] opacity-0 scale-0 animate-[star-show_1s_ease-in-out_forwards]"
        src={failIcon}
      />
      <img
        className="mt-[12px] cursor-pointer w-[80px] opacity-0 scale-0 animate-[1s_inactive-star-show_2s_ease-in-out_forwards]"
        src={restartIcon}
        onClick={onClick}
      />
    </div>
  );
};
