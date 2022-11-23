import { useMemo } from "react";
import { Restaurant } from "@/pages/Restaurant/entity";
import useStore from "@/store";
import { Column } from "./Column";

export const Overview = () => {
  const impression = useStore((state) =>
    (state.restaurant.restaurant as Restaurant).getImpression()
  );
  const attractive = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).attractive
  );
  const cooking = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).cooking
  );
  const serviceLevel = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).serviceLevel
  );
  const health = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).health
  );
  const efficiency = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).efficiency
  );
  const safety = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).safety
  );

  const data = useMemo(
    () => ({
      name: "餐厅详情",
      infos: [
        {
          name: "餐厅吸引力",
          value: attractive,
          tip: "餐厅吸引力：数值范围0~100（超过100的部分依然有效），影响顾客进店概率",
        },
        {
          name: "餐厅形象",
          value: impression,
          tip: "餐厅形象：数值范围0~100（超过100的部分依然有效），影响餐厅吸引力、顾客心情",
        },
        {
          name: "餐厅服务水平",
          value: serviceLevel,
          tip: "餐厅服务水平：数值范围0~100（超过100的部分依然有效），影响顾客满意度、顾客消费金额、小幅影响餐厅对顾客吸引力",
        },
        {
          name: "餐厅厨艺",
          value: cooking,
          tip: "餐厅厨艺：数值范围0~100（超过100的部分依然有效），影响餐厅对顾客吸引力、顾客满意度、顾客消费金额",
        },
        {
          name: "餐厅效率",
          value: efficiency,
          tip: "运转效率：数值代表百分比，影响工作完成时间。比如厨师做饭时间10s，效率80%，实际完成时间12s。",
        },
        {
          name: "餐厅卫生",
          value: health,
          tip: "餐厅卫生：数值范围0~100（超过100的部分依然有效），影响顾客满意度、卫生局检查概率（卫生越差越容易被检查，越可能被罚款）",
        },
        {
          name: "餐厅安全性",
          value: safety,
          tip: "餐厅安全性：数值范围0~100（超过100的部分依然有效），影响偷窃（针对顾客）、盗窃（针对餐厅）的发生概率以及损失的金额",
        },
      ],
    }),
    [efficiency, health, safety]
  );

  return <Column data={data} />;
};
