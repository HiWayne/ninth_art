import { MutableRefObject, useCallback, useEffect, useRef } from "react";

interface MusicConfig {
  loop?: boolean;
  muted?: boolean;
}

export const useMusic = (src: string, _config: MusicConfig) => {
  const config = { loop: false, muted: false, ..._config };
  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = config.loop;
    audioRef.current.muted = config.muted;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (audioRef.current.loop !== config.loop) {
        audioRef.current.loop = config.loop;
      }
      if (audioRef.current.muted !== config.muted) {
        audioRef.current.muted = config.muted;
      }
    }
  }, [config.loop, config.muted]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return {
    play,
    pause,
    stop,
  };
};
