import { useMemo } from "react";
import { Restaurant } from "@/pages/Restaurant/entity";
import useStore from "@/store";
import { StaffList } from "./components";
import { Column } from "../Column";

export const Staff = () => {
  const cookers = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).cookers
  );
  const waiters = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).waiters
  );
  const cleaners = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).cleaners
  );
  const receptionists = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).receptionists
  );
  const securityGuards = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).securityGuards
  );

  const data = useMemo(
    () => ({
      name: "员工信息",
      infos: [
        {
          name: "厨师",
          value: <StaffList list={cookers} />,
        },
        {
          name: "服务员",
          value: <StaffList list={waiters} />,
        },
        {
          name: "清洁员",
          value: <StaffList list={cleaners} />,
        },
        {
          name: "宣传员",
          value: <StaffList list={receptionists} />,
        },
        {
          name: "安保",
          value: <StaffList list={securityGuards} />,
        },
      ],
    }),
    []
  );

  return <Column data={data} />;
};
