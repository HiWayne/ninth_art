import { FoodMaterial } from "../entity/thing/FoodMaterial";

// 单价/斤

export const qinCai = new FoodMaterial("青菜", 5, 0);

export const douFu = new FoodMaterial("豆腐", 5, 0);

export const egg = new FoodMaterial("鸡蛋", 8, 0);

export const xiHongShi = new FoodMaterial("西红柿", 5, 0);

export const foodMaterials = [qinCai, douFu, egg, xiHongShi];
