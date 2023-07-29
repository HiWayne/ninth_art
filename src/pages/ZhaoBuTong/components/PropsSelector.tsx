import { FC } from "react";
import bg from "../assets/images/props_selector_bg.png";
import btnBg from "../assets/images/use_prop_btn.png";
import closeIcon from "../assets/images/levels/close.png";

export const PropsSelector: FC<{
  gameProps: {
    icon: string;
    desc: string;
    number: number;
    effect: () => void;
  }[];
  onClose: () => void;
}> = ({ gameProps, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-[990] flex w-[100vw] h-[-webkit-fill-available] flex flex-col justify-center items-center">
      <div
        style={{ background: `url('${bg}') center top / cover no-repeat` }}
        className="relative flex justify-center items-center p-[64rem] rounded-[24rem] w-[680rem] h-[533rem] overflow-y-auto no-scroll-bar"
      >
        <img
          className="absolute top-[28rem] right-[12rem] w-[80rem] cursor-pointer"
          onClick={onClose}
          src={closeIcon}
        />
        <div className="translate-x-[70rem] translate-y-[58rem] absolute top-0 bottom-0 left-0 right-0 margin-auto z-[-1] w-[560rem] h-[420rem] bg-[#f8f6e7]" />
        <div>
          {gameProps.map((gameProp) => (
            <div
              className="mt-[24rem] flex justify-between items-center"
              key={gameProp.icon}
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex justify-start items-center w-[190rem]">
                  <img className="w-[64rem]" src={gameProp.icon} />
                  <span className="ml-[12rem] font-[Skranji-Bold] text-[20px] text-[#333]">
                    × {gameProp.number}
                  </span>
                </div>
                <p className="mt-[4rem] text-[#333] text-[12px]">
                  {gameProp.desc}
                </p>
              </div>
              <span
                style={{
                  background: `url('${btnBg}') center / contain no-repeat`,
                }}
                className="ml-[24rem] flex justify-center items-center w-[128rem] h-[58rem] border-box bg-[green] rounded-[16rem] cursor-pointer text-[#fff] text-bold"
                onClick={gameProp.effect}
              >
                使用
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
