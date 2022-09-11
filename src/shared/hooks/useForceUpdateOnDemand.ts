import { useReducer, useRef } from "react";

/**
 * @description 按需强制更新，如果依赖没有变则不更新
 * @param dependencies any[]
 * @returns updater函数
 */
export const useForceUpdateOnDemand = (dependencies: any[]) => {
  const [_s, _updater] = useReducer((n) => n + 1, 0);
  const dependenciesRef = useRef(dependencies);

  const updater = () => {
    if (
      dependencies.every(
        (dependence, index) => dependence === dependenciesRef.current[index]
      )
    ) {
      return;
    } else {
      dependenciesRef.current = dependencies;
      _updater();
    }
  };

  return updater;
};
