import { useCallback, useRef } from "react";

/**
 * @description 无论在什么情况下，始终执行最新函数
 * @param callback 任意函数
 * @returns callback
 */
export const useNewest = (callback: any) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback((...args) => {
    callbackRef.current(...args);
  }, []);
};
