// styled-component公共样式函数

/**
 * @description 背景模糊css样式（不会影响元素中的其他子元素）
 * @param { blur: string, backgroundColor: string } param blur: 模糊像素，默认1px； backgroundColor: 背景色，默认inherit
 * @returns {string}
 */
export const filterBlur: (config?: {
  blur?: string;
  backgroundColor?: string;
}) => string = ({ blur = "1px", backgroundColor = "inherit" } = {}) => `
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: ${backgroundColor}
    filter: blur(${blur});
  }
`;
