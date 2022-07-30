import { RefObject, useEffect } from "react";

const useStopScroll = (domRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const stopPropagation = (event: Event) => {
      console.log(event)
      event.stopPropagation();
      event.preventDefault()
    };
    domRef.current?.addEventListener("touchmove", stopPropagation);
    domRef.current?.addEventListener("scroll", stopPropagation);

    return () => {
      domRef.current?.removeEventListener("touchmove", stopPropagation);
      domRef.current?.removeEventListener("scroll", stopPropagation);
    };
  }, []);
};

export default useStopScroll