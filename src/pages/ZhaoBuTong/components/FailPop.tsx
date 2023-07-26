import { FC, useEffect, useRef } from "react";
import failIcon from "assets/images/fail.png";
import restartIcon from "assets/images/restart.png";

export const FailPop: FC<{ visibility: boolean; onClick: () => void }> = ({
  visibility,
  onClick,
}) => {
  const overflowValueRef = useRef("");

  useEffect(() => {
    if (visibility) {
      overflowValueRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflowValueRef.current;
      };
    } else {
      document.body.style.overflow = overflowValueRef.current;
    }
  }, [visibility]);

  return (
    <div
      style={visibility ? { display: "flex" } : { display: "none" }}
      className="flex flex-col justify-center items-center fixed left-0 top-0 z-[999] bg-[rgba(0,_0,_0,_0.4)] w-[100vw] h-[-webkit-fill-available]"
    >
      <img className="w-[90%] translate-x-[12px]" src={failIcon} />
      <img
        className="mt-[40px] cursor-pointer w-[80px]"
        src={restartIcon}
        onClick={onClick}
      />
    </div>
  );
};
