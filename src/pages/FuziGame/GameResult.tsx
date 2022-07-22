import { FC } from "react";
import Fail from "./Fail";
import FireWorks from "./FireWork";
import { GameResultProps } from "./shared/types";

const GameResult: FC<GameResultProps> = ({ result }) => {
  if (result === 0) {
    return null;
  } else if (result === 1) {
    return <FireWorks />;
  } else {
    return <Fail />;
  }
};

export default GameResult;
