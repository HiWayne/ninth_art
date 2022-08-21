export type StaffType =
  | "cooker"
  | "waiter"
  | "cleaner"
  | "securityGuard"
  | "receptionist";

export interface Property<T = number> {
  value: T;
  name: string;
  desc: string;
}

export interface RawMaterial {
  // 原材料名称
  name: string;
  // 原材料价格
  price: string;
}

// 廉价的 | 普通的 | 稍好的 | 精致的 | 华丽的 | 特色的 | 专店定制的
export type ThingType =
  | "cheap"
  | "ordinary"
  | "slightlyBetter"
  | "delicate"
  | "gorgeous"
  | "featured"
  | "customized";

export interface Position {
  x: number;
  y: number;
}
