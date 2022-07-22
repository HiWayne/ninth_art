const computeScore = (findCount: number, speededTime: number) => {
  return Math.ceil(
    1000 * (1 / (speededTime / 1000 / findCount)) * (1 + findCount / 4)
  );
};

export default computeScore;
