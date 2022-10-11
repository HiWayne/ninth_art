import { random, randomlyTaken, randomNumber } from "@/shared/utils";
import { StaffType } from "../types";
import { createName } from "./createName";
import { createStaffValue } from "./createStaffValue";
import type { Skill } from "../entity";
import {
  CookerSkillsLevel1,
  CookerSkillsLevel2,
  CookerSkillsLevel3,
  menus,
} from "../constant";

export const createStaff = (type: StaffType, count: number = 5) => {
  const staffs: any[] = [];
  new Array(count).fill(true).forEach(() => {
    const partialValue = createStaffValue();
    const gender = random(0.5) ? 0 : 1;
    let name = createName(partialValue.rarity, gender);
    while (staffs.some((staff) => staff.name === name)) {
      name = createName(partialValue.rarity, gender);
    }
    const skills: Skill<any>[] = [];
    switch (type) {
      case "cooker":
        if (partialValue.rarity === 3) {
          // 10%几率有技能
          if (random(0.1)) {
            skills.push(randomlyTaken(CookerSkillsLevel1, 1).result[0]);
            // 1%几率有2技能
            if (random(0.1)) {
              skills.push(randomlyTaken(CookerSkillsLevel1, 1).result[0]);
              if (random(0.01)) {
                skills.push(randomlyTaken(CookerSkillsLevel1, 1).result[0]);
              }
            }
          }
        } else if (partialValue.rarity === 4) {
          if (random(0.4)) {
            skills.push(randomlyTaken(CookerSkillsLevel2, 1).result[0]);
            if (random(0.3)) {
              skills.push(randomlyTaken(CookerSkillsLevel2, 1).result[0]);
              if (random(0.2)) {
                skills.push(randomlyTaken(CookerSkillsLevel2, 1).result[0]);
              }
            }
          }
        } else if (partialValue.rarity === 5) {
          if (random(0.8)) {
            skills.push(randomlyTaken(CookerSkillsLevel3, 1).result[0]);
            if (random(0.6)) {
              skills.push(randomlyTaken(CookerSkillsLevel3, 1).result[0]);
              if (random(0.5)) {
                skills.push(randomlyTaken(CookerSkillsLevel3, 1).result[0]);
              }
            }
          }
        }
        break;
    }
    if (type === "cooker") {
      const canStudyMenus = menus.filter(
        (menu) => menu._difficulty <= partialValue.ability
      );
      let dishLimit = 0;
      if (partialValue.rarity <= 3) {
        dishLimit = randomNumber(1, 2);
      } else if (partialValue.rarity === 4) {
        dishLimit = randomNumber(1, 3);
      } else if (partialValue.rarity === 5) {
        dishLimit = randomNumber(2, 5);
      }

      // 计算厨艺
      const createMenus = randomlyTaken(canStudyMenus, dishLimit).result;
      const cookings = createMenus.map((createMenu) => {
        return Math.min(
          partialValue.ability * 1.1,
          Math.min(
            100,
            partialValue.ability * 0.7 +
              (partialValue.ability - createMenu._difficulty) * 0.6
          )
        );
      });
      staffs.push({
        ...partialValue,
        name,
        gender,
        status: 0,
        skills,
        dishes: createMenus.map((createMenu, index) =>
          createMenu(cookings[index])
        ),
      });
    } else {
      staffs.push({
        ...partialValue,
        name,
        gender,
        status: 0,
        skills,
      });
    }
  });
  return staffs;
};
