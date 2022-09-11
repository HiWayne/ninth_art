/**
 * @description 从一个范围里随机返回一个整数，包括这个范围的边界
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
