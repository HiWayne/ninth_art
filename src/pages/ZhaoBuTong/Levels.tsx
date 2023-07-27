import { useEffect, useMemo, useState } from "react";
import useStore from "@/store";
import shallow from "zustand/shallow";
import { SAVED_LEVELS_SCORE, SAVED_PROPS, charList } from "@/store/zhaoBuTong";
import bg from "./assets/images/levels/bg.png";
import closeIcon from "./assets/images/levels/close.png";
import backIcon from "./assets/images/levels/back_btn.png";
import shopIcon from "./assets/images/levels/store_btn.png";
import gamePropStaticIcon from "./assets/images/game_prop_static.png";
import starActiveIcon from "./assets/images/levels/star_active.png";
import skranjiBoldFont from "./assets/fonts/Skranji-Bold.otf";
import { LeftArrow, Level, Pagination, RightArrow } from "./components/Levels";
import { REMAINING_TIME } from "./Game";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PAGE_SIZE = 10;

let savedLevelsScoreRef: {
  current: Record<
    number,
    {
      level: number;
      score: number | null;
      remainingTime: number;
      speedTime: number | null;
      minSpeedTime: number | null;
      recordDate: number | null;
      gotProp: boolean;
    }
  >;
} = { current: {} };
try {
  savedLevelsScoreRef.current = JSON.parse(
    window.localStorage.getItem(SAVED_LEVELS_SCORE) || ""
  );
} catch {
  savedLevelsScoreRef.current = {
    0: {
      level: 0,
      score: null,
      remainingTime: REMAINING_TIME,
      speedTime: null,
      minSpeedTime: null,
      recordDate: null,
      gotProp: false,
    },
  };
}

const Levels = styled(() => {
  const { currentLevel, gamePropsCount } = useStore(
    (state) => ({
      currentLevel: state.zhaoBuTong.currentLevel,
      gamePropsCount: state.zhaoBuTong.gamePropsCount,
    }),
    shallow
  );

  const [currentPage, setCurrentPage] = useState(
    Math.ceil((currentLevel + 1) / 10) - 1
  );

  const totalPage = useMemo(() => Math.ceil(charList.length / PAGE_SIZE), []);

  const lastLevel = useMemo(() => {
    const levels = Object.keys(savedLevelsScoreRef.current)
      .map((s) => Number(s))
      .filter((n) => !Number.isNaN(n))
      .sort();
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (
        !savedLevelsScoreRef.current[level] ||
        !savedLevelsScoreRef.current[level].score
      ) {
        return level;
      }
      return level + 1;
    }
    return 0;
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      savedLevelsScoreRef.current = JSON.parse(
        window.localStorage.getItem(SAVED_LEVELS_SCORE) || ""
      );
    } catch {
      savedLevelsScoreRef.current = {
        0: {
          level: 0,
          score: null,
          remainingTime: REMAINING_TIME,
          speedTime: null,
          minSpeedTime: null,
          recordDate: null,
          gotProp: false,
        },
      };
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-[100%] h-[100%]">
      <div>
        <div>
          <img src={gamePropStaticIcon} />x{gamePropsCount}
        </div>
        <div>
          <img src={starActiveIcon} />
        </div>
      </div>
      <div className="relative w-[700rem]">
        <img src={bg} />
        <div className="ml-[-12rem] absolute overflow-hidden left-[86rem] top-[140rem] w-[550rem]">
          <div
            style={{ transform: `translateX(-${currentPage * 550}rem)` }}
            className="whitespace-nowrap duration-300 ease-out transition-transform"
          >
            {Array.from({ length: totalPage }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="inline-flex flex-wrap justify-start items-center"
              >
                {Array.from({ length: PAGE_SIZE }).map((_, index) => {
                  const level = index + pageIndex * PAGE_SIZE;
                  return (
                    <Level
                      key={level}
                      stars={
                        savedLevelsScoreRef.current[level]?.score || undefined
                      }
                      locked={level > lastLevel}
                      gotProp={
                        savedLevelsScoreRef.current[level]?.gotProp || false
                      }
                      level={level}
                      record={
                        savedLevelsScoreRef.current[level]?.speedTime ||
                        undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {/* 关闭按钮 */}
        <img
          onClick={() => {
            navigate("/games");
          }}
          className="w-[72rem] absolute top-[48rem] right-0 cursor-pointer"
          src={closeIcon}
        />
        {/* 左箭头 */}
        <LeftArrow
          active={currentPage > 0}
          onClick={() => {
            setCurrentPage((page) => {
              if (page - 1 >= 0) {
                return page - 1;
              } else {
                return page;
              }
            });
          }}
        />
        {/* 右箭头 */}
        <RightArrow
          active={currentPage < totalPage - 1}
          onClick={() => {
            setCurrentPage((page) => {
              if (page + 1 <= totalPage - 1) {
                return page + 1;
              } else {
                return page;
              }
            });
          }}
        />
        <Pagination currentPage={currentPage} totalPage={totalPage} />
        {/* 返回 */}
        <img
          className="w-[88rem] absolute left-[140rem] bottom-0 translate-y-[calc(50%_-_8rem)] cursor-pointer"
          src={backIcon}
          onClick={() => {
            navigate("/games");
          }}
        />
        {/* 商店 */}
        <img
          className="w-[88rem] absolute right-[140rem] bottom-0 translate-y-[calc(50%_-_8rem)] cursor-pointer"
          src={shopIcon}
        />
      </div>
    </div>
  );
})`
  @font-face {
    font-family: "Skranji-Bold";
    src: url("${skranjiBoldFont}");
  }
`;

export default Levels;
