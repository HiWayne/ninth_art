/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  CSSProperties,
} from "react";
import { separateNumberAndUnit } from "utils/separateNumberAndUnit";

interface IconPropsType {
  className: string;
  src: string;
  width: string;
  height: string;
  ratio?: number;
  style?: CSSProperties;
}

const Icon: FunctionComponent<IconPropsType> = ({
  className,
  src,
  width,
  height,
  style,
  ratio,
  ...props
}: IconPropsType) => {
  const wrapperStyle = {
    width: width,
    height: height,
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    khtmlUserSelect: "none",
    msUserSelect: "none",
    OUserSelect: "none",
    userSelect: "none",
    fontSize: "0",
  };
  const contentStyle = {
    display: "inline-block",
    width: width,
    height: height,
    paddingTop: height === "auto" && ratio ? (1 / ratio) * 100 + "%" : "",
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <i
      className={className}
      style={
        style
          ? {
              ...style,
              ...wrapperStyle,
            }
          : (wrapperStyle as any)
      }
      {...props}
    >
      <span style={contentStyle}></span>
    </i>
  );
};

interface DtIconPropsType {
  src: string;
  width?: string | number;
  height?: string | number;
  ratio?: number;
  fallback?: () => React.ReactElement;
  failImage?: string;
  style?: CSSProperties;
  onError?: (src: string, image: HTMLImageElement) => void;
  designDraftWidth?: number;
  className?: string;
}

const DtIcon: FunctionComponent<DtIconPropsType> = ({
  type,
  src,
  width = "100px",
  height = "auto",
  ratio,
  onError,
  fallback: Fallback,
  failImage = "https://c-ssl.duitang.com/uploads/ops/202103/18/20210318165931_dd240.png",
  style = {},
  className,
  ...props
}) => {
  if (typeof width === "number") {
    width += "px";
  }
  if (typeof height === "number") {
    height += "px";
  }
  const [size, setSize] = useState({ width, height });
  const [initialSize, setInitialSize] = useState({ width, height });
  const [error, setError] = useState(false);
  const imageRef: React.MutableRefObject<HTMLImageElement> = useRef(
    null
  ) as any;

  if (width !== initialSize.width || height !== initialSize.height) {
    setSize({ width, height });
    setInitialSize({ width, height });
  }

  useEffect(() => {
    if (height === "auto" && !ratio && src) {
      if (!imageRef.current) {
        const image = new Image();
        image.onload = () => {
          const _width = image.width;
          const _height = image.height;
          if (width !== "auto") {
            const ratio = _width / _height;
            const { number, unit } = separateNumberAndUnit(width);
            const finalHeight = number / ratio + unit;
            setSize({ width: width + "", height: finalHeight });
          } else {
            setSize({ width: _width + "px", height: _height + "px" });
          }
        };
        image.onerror = () => {
          setError(true);
          if (typeof onError === "function") {
            onError(src, image);
          }
        };
        imageRef.current = image;
        image.src = src;
      } else {
        imageRef.current.src = src;
      }
    }
  }, [width, height, src]);

  if (error || !src) {
    return Fallback ? (
      <Fallback />
    ) : (
      <img
        src={failImage}
        style={{
          display: "inline-block",
          width: size.width,
          height: size.height,
          objectFit: "contain",
          objectPosition: "center",
          ...style,
        }}
        className={className}
        {...props}
      />
    );
  } else {
    return (
      <Icon
        className={`dt-icon${className ? " " + className : ""}`}
        src={src}
        width={size.width as string}
        height={size.height as string}
        ratio={ratio}
        style={style}
        {...props}
      ></Icon>
    );
  }
};

export default DtIcon;
