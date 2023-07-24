// import { Fireworks } from "@fireworks-js/react";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import styled from "styled-components";
import { Fireworks as FireworksJs } from "fireworks-js";
import type { FireworksOptions } from "fireworks-js";
import { filterBlur } from "shared/styles/index";
import { useState } from "react";
import Score from "./shared/components/Score";
import RestartButton from "./shared/components/RestartButton";
import useStopScroll from "@/shared/hooks/useStopScroll";

type FireworksProps = {
  children?: React.ReactNode;
  options?: FireworksOptions;
  style?: CSSProperties;
  className?: string;
};

const Fireworks = ({ children, options, style, className }: FireworksProps) => {
  const fireworks = useRef<FireworksJs | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // React.StrictMode in React18+ will lead useEffect(() => {}, []) called twice.
    if (!fireworks.current) {
      fireworks.current = new FireworksJs(container.current!, options);
    }
    fireworks.current.start();

    return () => {
      fireworks.current!.stop();
    };
  }, []);

  return (
    <div ref={container} style={style} className={className}>
      {children}
    </div>
  );
};

const FireWorksCanvas = styled(({ className }) => {
  const [showRestart, setShowRestart] = useState(false);

  const container = useRef<HTMLDivElement>(null);

  useStopScroll(container);

  useEffect(() => {
    const timeoutTimer = setTimeout(() => {
      setShowRestart(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutTimer);
    };
  }, []);

  return (
    <div ref={container}>
      <Fireworks
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
          },
        }}
        className={className}
      />
      <Score />
      {showRestart ? <RestartButton>确定</RestartButton> : null}
    </div>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  ${filterBlur()}
`;

export default FireWorksCanvas;
