import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";

/**
 * @description useState hook在setState后只是往对应的hook对象中添加了一个updater，state在将来的调度中更新。而此时使用它的函数依然使用的是旧state，所以需要一个新hook能额外返回一个及时更新的值
 * @param state useState的参数
 * @return [state, setState, stateRef]
 */
const useImmediateState: <T = any>(
  initialState: T
) => [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);

  const update = useCallback(
    (newState: any) => {
      if (typeof newState === "function") {
        stateRef.current = newState(stateRef.current);
      } else {
        stateRef.current = newState;
      }
      setState(newState);
    },
    []
  );

  return [state, update, stateRef];
};

export default useImmediateState;
