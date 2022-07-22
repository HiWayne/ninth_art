export interface NumberAndUnitType {
  number: number;
  unit: string;
}

/**
 * @description 将数字与单位分离，如"12px" 返回 { number: 12, unit: 'px' }、"1.5rem"返回 { number: 1.5, unit: 'rem' }、如果是数字则返回 { number: ${param}, unit: '' }
 * @param {string} s 需要分离的字符串
 * @returns {NumberAndUnitType}
 */
export const separateNumberAndUnit = (
  s: string | number
): NumberAndUnitType => {
  if (Number(s)) {
    return { number: Number(s), unit: "" };
  }
  if (typeof s === "string") {
    const number = parseFloat(s as string);
    if (Number(number)) {
      const start = s.lastIndexOf(number + "");
      const length = (number + "").length;
      // 单位开始的位置
      const unitStartIndex = start + length;
      const unit = s.slice(unitStartIndex);
      return { number, unit };
    } else {
      throw new Error(`${s} can not be converted to number`);
    }
  } else {
    throw new Error(
      `0 of param in separateNumberAndUnit should be string or number`
    );
  }
};
