interface TextTypeMap {
  winner: string[];
  loser: string[];
}

export const randomText = (type: keyof TextTypeMap = "winner") => {
  const winnerTexts = [
    "你今后的日子一定福气满满~",
    "干的不错，试试刷新记录吧",
    "福旺、财旺、运气旺！",
  ];
  const loserText = [
    "哎呀，福气溜走了~",
    "不要灰心，再接再厉",
    "有点不甘心呢~ 再试试吧",
  ];

  const textTypeMap = {
    winner: winnerTexts,
    loser: loserText,
  };
  return textTypeMap[type][Math.floor(Math.random() * 3)];
};
