import { getNumberInNormalDistribution, randomNumber } from "@/shared/utils";

export const createStaffValue = () => {
  let ability;
  let salary;
  let rarity;

  const randomValue = Math.random();

  // 5星概率0.5%、4星概率5%、3星概率50%、2星概率30%、1星概率14.5%
  if (randomValue <= 0.005) {
    rarity = 5;
  } else if (randomValue <= 0.055) {
    rarity = 4;
  } else if (randomValue <= 0.555) {
    rarity = 3;
  } else if (randomValue <= 0.855) {
    rarity = 2;
  } else {
    rarity = 1;
  }

  if (rarity === 5) {
    ability = Math.min(getNumberInNormalDistribution(85, 10), 100);
  } else if (rarity === 4) {
    ability = Math.min(getNumberInNormalDistribution(75, 10), 100);
  } else if (rarity === 3) {
    ability = Math.min(getNumberInNormalDistribution(65, 10), 100);
  } else if (rarity === 2) {
    ability = Math.min(getNumberInNormalDistribution(45, 10), 100);
  } else {
    ability = Math.min(getNumberInNormalDistribution(25, 10), 100);
  }

  if (ability <= 65) {
    salary = randomNumber(ability * 100 * 0.8, ability * 100 * 1.2);
  } else if (ability <= 75) {
    salary = randomNumber(ability * 150 * 0.8, ability * 150 * 1.2);
  } else if (ability <= 85) {
    salary = randomNumber(ability * 200 * 0.8, ability * 200 * 1.2);
  } else if (ability <= 95) {
    salary = randomNumber(ability * 250 * 0.8, ability * 250 * 1.2);
  } else {
    salary = randomNumber(ability * 300 * 0.8, ability * 300 * 1.2);
  }

  const energy = getNumberInNormalDistribution(70, 10);

  const stability = getNumberInNormalDistribution(70, 20);

  return {
    rarity,
    ability,
    salary,
    energy,
    stability,
  };
};
