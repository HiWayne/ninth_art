import { randomNumber } from "./randomNumber";

/**
 * @description 从一个集合里随机取指定的次数，不会重复取
 * @param target 数组
 * @param count 取的次数
 * @returns { result: T[]; remaining: T[] }
 */
export const randomlyTaken = <T = any>(
  target: T[],
  count: number
): { result: T[]; remaining: T[] } => {
  const result = [];
  const _target = [...target];
  for (let c = count; c > 0; c--) {
    if (_target.length === 0) {
      return { result, remaining: _target };
    }
    const index = randomNumber(0, _target.length - 1);
    result.push(_target[index]);
    _target.splice(index, 1);
  }
  return { result, remaining: _target };
};
