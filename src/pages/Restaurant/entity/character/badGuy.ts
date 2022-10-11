import { Physics } from "../Physics";

export class Thief extends Physics {
  // 偷窃水平：0-100，与保安水平共同影响偷窃成功率和金额
  ability: number;
  constructor(x: number, y: number, ability: number) {
    super(x, y);
    this.ability = ability;
  }
}

export class Robber extends Physics {
  // 武力水平：0-100，与保安水平共同影响抢劫概率和金额
  ability: number;
  constructor(x: number, y: number, ability: number) {
    super(x, y);
    this.ability = ability;
  }
}
