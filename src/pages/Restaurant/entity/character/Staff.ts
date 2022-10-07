import { Property, StaffType } from "../../types";
import {
  createAbilityProperty,
  createEnergyProperty,
  createRarityProperty,
  createSalaryProperty,
  createSkillsProperty,
  createStabilityProperty,
  createStatusProperty,
} from "../../utils";
import { Physics } from "../Physics";
import { Skill } from "./Skill";

export class Staff<T = any> extends Physics {
  // 薪水：每月工资
  salary: Property;
  // 工作能力：0-100，影响员工能力发挥
  ability: Property;
  // 掌握的特殊技能
  skills: Property<Skill[]>;
  // 精力：0-100，持续工作（加班）的能力
  energy: Property;
  // 当前体力
  physicalStrength: number;
  // 稳定性：0-100，离职概率
  stability: Property;
  // 当前状态：0-休息、1-工作
  status: Property;
  // 员工稀有度：1-5
  rarity: Property;
  // 岗位名称
  name: string;
  // 人物功能描述
  effectDesc: string;
  // 类别
  type: StaffType;
  // 当月工作天数
  workingDays: number;
  // 累计工作年数
  workingYears: number;
  // 拖欠的工资
  arrearsOfWages: number;
  // 暂停发工资
  payrollSuspension: boolean;
  constructor(
    x: number,
    y: number,
    type: StaffType,
    name: string,
    effectDesc: string,
    salary: number,
    ability: number,
    skills: Skill<T>[],
    energy: number,
    stability: number,
    status: number,
    rarity: 1 | 2 | 3 | 4 | 5
  ) {
    super(x, y)
    this.type = type;
    this.name = name;
    this.effectDesc = effectDesc;
    this.salary = createSalaryProperty(salary);
    this.ability = createAbilityProperty(ability);
    this.skills = createSkillsProperty(skills);
    this.energy = createEnergyProperty(energy);
    this.physicalStrength = energy;
    this.stability = createStabilityProperty(stability);
    this.status = createStatusProperty(status);
    this.rarity = createRarityProperty(rarity);
    this.workingDays = 0;
    this.workingYears = 0;
    this.arrearsOfWages = 0;
    this.payrollSuspension = false;
  }
  work() {
    this.status = createStatusProperty(1);
  }
  rest() {
    this.status = createStatusProperty(0);
  }
  study(skill: Skill) {
    this.skills = createSkillsProperty([...this.skills.value, skill]);
  }
  changeStability(stability: number) {
    this.stability = createStabilityProperty(stability);
  }
  addWorkingDays() {
    this.workingDays++;
  }
  initWorkingDays() {
    this.workingDays = 0;
  }
  addWorkingYears() {
    this.workingYears++;
  }
  changePhysicalStrength(physicalStrength: number, type: 0 | 1 = 0) {
    if (type === 0) {
      // 减少
      this.physicalStrength -= physicalStrength;
    } else if (type === 1) {
      // 增加
      this.physicalStrength += physicalStrength;
    }
  }
  // 充满体力
  fillPhysicalStrength() {
    this.physicalStrength = this.energy.value;
  }
  changeArrearsOfWages(arrearsOfWages: number) {
    this.arrearsOfWages = arrearsOfWages;
  }
  // 是否暂停发工资
  changePayrollSuspension(payrollSuspension: boolean) {
    this.payrollSuspension = payrollSuspension;
  }
}
