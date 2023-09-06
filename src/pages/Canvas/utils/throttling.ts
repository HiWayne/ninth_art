/**
 * @description 给某个函数扩展节流功能
 * @param action 需要节流的函数
 * @param time number，节流阈值，单位毫秒，默认20ms
 * @param options {loosely: boolean} loosely-false: 如果某次调用被节流挡住了，等节流时间结束会自动再次调用; loosely-true（默认）: 如果某次调用被节流挡住了，等节流时间结束也不会再次调用
 * @returns 被包装了节流的函数
 */
const throttling = <T>(action: T, time?: number, options?: { loosely?: boolean }): any => {
  time = time || 20;
  const { loosely = true } = options || {};
  let stop = false,
    temporaryStorage: { params: any; timestamp: number } = null as any;
  const actionWithThrottling = (...params: any[]) => {
    if (stop) {
      // 如果下一次调用可能确实是必要调用，不巧被节流被锁住了，所以要记录一下最新一次被锁住的行为，等锁放开后再自动调用它
      // 比如有如下场景：触底加载下一页，如果触底的时刻正好被节流了，那么加载行为就永远不会发生，除非用户上滑后再下滑，再次触发触底
      // 所以需要有这种延迟消费机制
      if (!loosely) {
        temporaryStorage = { params, timestamp: new Date().getTime() };
      }
      return;
    } else {
      stop = true;
      if (typeof action === 'function') {
        action(...params);
      }
      setTimeout(() => {
        stop = false;
        if (temporaryStorage) {
          const params = temporaryStorage.params;
          temporaryStorage = null as any;
          actionWithThrottling(...params);
        }
      }, time);
    }
  };
  return actionWithThrottling;
};

export default throttling;
