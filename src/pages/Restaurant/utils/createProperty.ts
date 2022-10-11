import { Cooker, Skill, Staff } from "../entity";
import { Property } from "../types";

export const createProperty: <T = number>(
  name: string,
  desc: string
) => (value: T) => Property<T> = (name: string, desc: string) => (value) => ({
  name,
  value,
  desc,
});

export const createSalaryProperty = createProperty(
  "薪水",
  "每个月需要支付的工资"
);
export const createAbilityProperty = createProperty(
  "工作能力",
  "影响员工各方面的表现"
);
export const createSkillsProperty = createProperty<Skill<Staff | Cooker>[]>(
  "特殊技能",
  "随时间有几率获得工种相关的特殊技能，人物稀有度越高几率越大"
);
export const createEnergyProperty = createProperty(
  "精力",
  "影响员工持续工作的时间"
);
export const createStabilityProperty = createProperty(
  "稳定性",
  "影响员工离职概率"
);
export const createStatusProperty = createProperty(
  "工作状态",
  "员工处于工作or休息中"
);
export const createRarityProperty = createProperty(
  "稀有度",
  "稀有度代表了员工的天赋水平，影响了工作能力、学习技能的概率"
);
