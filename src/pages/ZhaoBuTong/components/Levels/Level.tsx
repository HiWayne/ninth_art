import { FC } from "react";
import { useNavigate } from "react-router-dom";
import levelOpenBgIcon from "../../assets/images/levels/level_open.png";
import levelCloseBgIcon from "../../assets/images/levels/level_close.png";
import starActiveIcon from "../../assets/images/levels/star_active.png";
import starInActiveIcon from "../../assets/images/levels/star_inactive.png";
import gamePropIcon from "../../assets/images/game_prop@200.gif";
import { SAVED_LEVEL, SAVED_LEVELS_SCORE } from "@/store/zhaoBuTong";
import { REMAINING_TIME } from "../../Game";
import useStore from "@/store";

const TOTAL_STARS = 3;

export const Level: FC<{
  stars?: number;
  locked: boolean;
  gotProp: boolean;
  level: number;
  record?: number;
}> = ({ stars, locked, gotProp, level, record }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`ml-[12rem]${
        locked ? " translate-y-[-6rem]" : " cursor-pointer"
      }`}
    >
      <div
        className="relative"
        onClick={() => {
          if (locked) {
            return;
          }
          try {
            const savedLevelsScore = JSON.parse(
              window.localStorage.getItem(SAVED_LEVELS_SCORE) || ""
            );
            // 从关卡选择列表进入时重置初始时间
            if (
              savedLevelsScore[level] &&
              savedLevelsScore[level].remainingTime !== REMAINING_TIME
            ) {
              savedLevelsScore[level].remainingTime = REMAINING_TIME;
              window.localStorage.setItem(
                SAVED_LEVELS_SCORE,
                JSON.stringify(savedLevelsScore)
              );
              useStore.getState().zhaoBuTong.setCurrentLevel(level);
            }
          } catch {
            void 0;
          }
          window.localStorage.setItem(SAVED_LEVEL, `${level}`);
          navigate("/games/zhaobutong/start");
        }}
      >
        <img
          className="inline-block w-[96rem]"
          src={locked ? levelCloseBgIcon : levelOpenBgIcon}
        />
        <div
          className="absolute z-[1] top-0 left-0 w-[100%] h-[100%] flex flex-col justify-center items-center"
          style={locked ? { transform: "translate(4rem, 5rem)" } : undefined}
        >
          <span
            className="font-[Skranji-Bold] text-[20px] text-[#fff]"
            style={{ WebkitTextStroke: "2px #3a230a" }}
          >
            {level + 1}
          </span>
          <div className="flex justify-center items-center ml-[-2rem]">
            {Array.from({ length: TOTAL_STARS }).map((_, index) => (
              <img
                key={index}
                className="w-[20rem] ml-[2rem]"
                src={
                  index + 1 <= (stars || 0) ? starActiveIcon : starInActiveIcon
                }
              />
            ))}
          </div>
          {!locked && !gotProp ? (
            <img
              className="w-[32rem] h-[32rem] absolute bottom-[10rem] right-0 z-[1]"
              src={gamePropIcon}
            />
          ) : null}
        </div>
      </div>
      {record ? (
        <div className="text-[14rem] text-center">
          {Math.floor(record / 1000 / 60)
            ? `${Math.floor(record / 1000 / 60)}分`
            : ""}
          {((record / 1000) % 60).toFixed(1)}秒
        </div>
      ) : (
        <div className="text-[14rem]">&nbsp;</div>
      )}
    </div>
  );
};
