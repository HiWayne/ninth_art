import victory1Icon from "assets/images/victory_1.png";
import gamePropIcon from "assets/images/game_prop@200.gif";
import { FC } from "react";

export const SuccessPop: FC<{
  visibility: boolean;
  onNext: () => void;
  onRestart: () => void;
  gotProp: boolean;
}> = ({ visibility, onNext, onRestart, gotProp }) => {
  return (
    <div
      style={visibility ? { display: "block" } : { display: "none" }}
      className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[999] bg-[rgba(0,_0,_0,_0.4)]"
    >
      <div className="w-[90%] flex flex-col justify-start items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <img className="w-[100%]" src={victory1Icon} />
        {gotProp ? (
          <div className="flex justify-start items-center translate-x-[-16px]">
            <img className="w-[100px] h-[100px]" src={gamePropIcon} />
            <span className="ml-[12px] translate-y-[20px] text-[#fff] font-bold text-[16px]">
              获得道具x1
            </span>
          </div>
        ) : null}
        <div className="mt-[40px] flex justify-center items-center">
          <img className="w-[80px] cursor-pointer" onClick={onRestart} />
          <img className="ml-[60px] w-[80px] cursor-pointer" onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
