export const createAnimate = (callback: () => void) => {
  let stop = false;
  const animate = () => {
    requestAnimationFrame(() => {
      callback();
      if (!stop) {
        animate();
      }
    });
    return () => {
      stop = true;
    };
  };
  return animate;
};
