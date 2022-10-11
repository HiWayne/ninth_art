import { random, randomlyTaken } from "@/shared/utils";

const maleNormalNameSet = [
  "埃洛伊",
  "巴克斯",
  "贝尔",
  "卡尔",
  "卡梅尔",
  "达拉斯",
  "道金斯",
  "伊顿",
  "爱德华",
  "弗朗西斯",
  "盖尔",
  "乔治",
  "汉考克",
  "哈登",
  "惠勒",
  "欧文",
  "艾弗森",
  "詹姆斯",
  "杰克逊",
  "卡兹",
  "肯尼迪",
  "劳伦斯",
  "梅西",
  "马斯克",
  "麦克",
  "尼古拉斯",
  "诺兰",
  "奥拉夫",
  "奥斯卡",
  "欧文",
  "佩奇",
  "彼得",
  "昆汀",
  "李维斯",
  "罗伯特",
  "桑迪",
  "索尔",
  "汤姆森",
  "托尼",
  "瓦伦丁",
  "维克托",
  "华莱士",
  "泽维尔",
  "约克",
  "泽诺比亚",
];

const maleRareNameSet = [
  "阿喀琉斯",
  "费尔柴尔德",
  "古德里安",
  "尤利塞斯",
  "兰卡斯特",
];

const femaleNormalNameSet = [
  "艾贝尔",
  "爱丽丝",
  "艾琳",
  "芭比",
  "芭芭拉",
  "卡蜜尔",
  "谢丽尔",
  "迪莉娅",
  "伊丽莎白",
  "艾丽莎",
  "艾米莉",
  "福斯蒂娜",
  "盖布丽埃尔",
  "格洛丽亚",
  "汉娜",
  "海瑟薇",
  "伊莎贝尔",
  "简",
  "珍妮",
  "凯瑟琳",
  "克莱",
  "拉维尼亚",
  "莉奥诺拉",
  "麦当娜",
  "玛莎",
  "娜塔丽",
  "妮可",
  "奥黛塔",
  "奥莉维亚",
  "帕梅拉",
  "菲莉丝",
  "奎妮",
  "丽娜",
  "罗琳",
  "赛琳娜",
  "雪莱",
  "蒂芙尼",
  "塔尼娅",
  "尤娜",
  "维罗妮卡",
  "温妮",
  "泽尼娅",
  "伊薇特",
  "齐尼娅",
];

const femaleRareNameSet = [
  "戴安娜",
  "黛尔菲恩",
  "伊莎贝拉",
  "维多利亚",
  "维纳斯",
];

const normalNameSet = [maleNormalNameSet, femaleNormalNameSet];

const rareNameSet = [maleRareNameSet, femaleRareNameSet];

export const createName = (rarity: 1 | 2 | 3 | 4 | 5, gender: 0 | 1) => {
  if (rarity >= 4) {
    if (random(0.6)) {
      const rareNames = rareNameSet[gender];
      const { result } = randomlyTaken(rareNames, 1);
      return result[0];
    }
  }
  const normalNames = normalNameSet[gender];
  const { result } = randomlyTaken(normalNames, 1);
  return result[0];
};
