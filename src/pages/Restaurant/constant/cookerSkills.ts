import { Cooker } from "../entity";
import { Skill } from "../entity/character/Skill";

const cookerSkillLevel1_1 = new Skill<Cooker>(
  1,
  "家常小厨",
  "使本人做出的『稀有度3及以下』的菜『美味度+3』",
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity <= 3) {
        dish.cooking += 3;
      }
    });
  },
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity <= 3) {
        dish.cooking -= 3;
      }
    });
  }
);

const cookerSkillLevel1_2 = new Skill<Cooker>(
  1,
  "虔诚学徒",
  "自知还未学有所成，雇佣后薪水『-5%』、稳定性『+5%』",
  (restaurant, self) => {
    self.salary.value -= self.salary.value * 0.05;
    self.stability.value += self.stability.value * 0.05;
  },
  (restaurant, self) => {}
);

const cookerSkillLevel2_1 = new Skill<Cooker>(
  2,
  "拿手家常菜",
  "使本人做出的『稀有度3及以下』的菜『美味度+5』",
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity <= 3) {
        dish.cooking += 5;
      }
    });
  },
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity <= 3) {
        dish.cooking -= 5;
      }
    });
  }
);

const cookerSkillLevel2_2 = new Skill<Cooker>(
  2,
  "熟练工",
  "因为有先前的工作经验，使本餐厅运转效率『增加2点』",
  (restaurant) => {
    restaurant.efficiency += 2;
  },
  (restaurant) => {
    restaurant.efficiency -= 2;
  }
);

const cookerSkillLevel3_1 = new Skill<Cooker>(
  3,
  "美味家常菜",
  "使本人做出的『稀有度3及以下』的菜『美味度+7』",
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity <= 3) {
        dish.cooking += 7;
      }
    });
  },
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity <= 3) {
        dish.cooking -= 7;
      }
    });
  }
);

const cookerSkillLevel3_2 = new Skill<Cooker>(
  3,
  "野路子『MPA』",
  "因为自学过公共管理，使本餐厅运转效率『增加5点』",
  (restaurant) => {
    restaurant.efficiency += 5;
  },
  (restaurant) => {
    restaurant.efficiency -= 5;
  }
);

const cookerSkillLevel4_1 = new Skill<Cooker>(
  4,
  "富贵险中求",
  "全局唯一效果：使所有食材采购成本降低10%，但卫生降低20点",
  (restaurant) => {
    restaurant.discount = 0.9;
    restaurant.health -= 20;
  },
  (restaurant) => {
    restaurant.discount = 1;
    restaurant.health += 20;
  },
  true
);

const cookerSkillLevel4_2 = new Skill<Cooker>(
  4,
  "绝味家常菜",
  "使本人做出的『稀有度3及以下』的菜『美味度+10』",
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity >= 4) {
        dish.cooking += 10;
      }
    });
  },
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity >= 4) {
        dish.cooking -= 10;
      }
    });
  }
);

const cookerSkillLevel4_3 = new Skill<Cooker>(
  4,
  "好物须上品",
  "使本人做出的『稀有度4及以上』的菜『美味度+10』",
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity >= 4) {
        dish.cooking += 10;
      }
    });
  },
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      if (dish.rarity >= 4) {
        dish.cooking -= 10;
      }
    });
  }
);

const cookerSkillLevel5_1 = new Skill<Cooker>(
  5,
  "天资绝顶",
  "使本人可学习的菜谱数量『上限+1』",
  (restaurant, self) => {
    self.dishLimit += 1;
  },
  (restaurant, self) => {
    self.dishLimit -= 1;
  }
);

const cookerSkillLevel5_2 = new Skill<Cooker>(
  5,
  "顶级MPA",
  "厨师全局唯一效果：使餐厅运转效率『增加10点』",
  (restaurant) => {
    restaurant.efficiency += 5;
  },
  (restaurant) => {
    restaurant.efficiency -= 5;
  },
  true
);

const cookerSkillLevel5_3 = new Skill<Cooker>(
  5,
  "食神",
  "使本人做出的『所有』菜『美味度+15』",
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      dish.cooking += 15;
    });
  },
  (restaurant, self) => {
    self.dishes.forEach((dish) => {
      dish.cooking -= 15;
    });
  },
  true
);

// 包含等级1、2技能
export const CookerSkillsLevel1 = [
  cookerSkillLevel1_1,
  cookerSkillLevel1_2,
  cookerSkillLevel2_1,
  cookerSkillLevel2_2,
];

// 包含等级1、2、3、4技能
export const CookerSkillsLevel2 = [
  ...CookerSkillsLevel1,
  cookerSkillLevel3_1,
  cookerSkillLevel3_2,
  cookerSkillLevel4_1,
  cookerSkillLevel4_2,
  cookerSkillLevel4_3,
];

// 包含等级3、4、5技能
export const CookerSkillsLevel3 = [
  cookerSkillLevel3_1,
  cookerSkillLevel3_2,
  cookerSkillLevel4_1,
  cookerSkillLevel4_2,
  cookerSkillLevel4_3,
  cookerSkillLevel5_1,
  cookerSkillLevel5_2,
  cookerSkillLevel5_3,
];
