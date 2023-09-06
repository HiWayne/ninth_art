type Callback = (...params: any[]) => any;

interface Config {
  allowInitial?: boolean; // 允许首次点击 和 触发setTimeout后的首次点击
}
/**
 * 防抖工厂函数
 * @param callback 想要获得防抖功能的函数
 * @param timeout 防抖延时 默认500ms
 * @param config
 * ```
 * {
 *    allowInitial?: boolean; 允许首次点击 和 触发setTimeout后的首次点击
 * }
 * ```
 * @returns
 */
const debounce = <T extends Callback>(callback: T, timeout = 500, config: Config = {}): T => {
  let timer: number;
  let firstTime = true;
  const { allowInitial } = config;

  return ((...params: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (allowInitial && firstTime) {
      callback(...params);
      firstTime = false;
    } else {
      timer = window.setTimeout(() => {
        callback(...params);
        firstTime = true;
      }, timeout);
    }
  }) as any;
};

export default debounce;
