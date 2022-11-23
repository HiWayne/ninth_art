import { Restaurant } from "@/pages/Restaurant/entity";
import useStore from "@/store";
import { ReactElement, useMemo, useState } from "react";
import styled from "styled-components";
import Icon from "shared/components/Icon";
import { Funding } from "./Funding";
import { Furnish } from "./Furnish";
import { Overview } from "./Overview";
import { Staff } from "./Staff";
import backIcon from "../../../assets/images/icon/back.svg";

const EntryWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DetailWrapper = styled.div``;

const Back = styled(({ className, ...props }) => (
  <div className={className}>
    <Icon src={backIcon} width={16} height={16} {...props} />
    <span {...props}>返回</span>
  </div>
))`
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #fff;
  & > span {
    margin-left: 4px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 80px);
  grid-template-rows: repeat(auto, 40px);
  gap: 10px;
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
`;

const DetailMap = {
  overview: Overview,
  staff: Staff,
  funding: Funding,
  furnish: Furnish,
  "": undefined,
};

interface InfoData {
  name: string;
  value: number | ReactElement;
  tip?: string;
}

export interface ColumnData {
  name: string;
  infos: InfoData[];
}

export const Entry = () => {
  const [pageType, setPageType] = useState<
    "overview" | "staff" | "funding" | "furnish" | ""
  >("");

  const Page = useMemo(() => DetailMap[pageType], [pageType]);

  const efficiency = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).efficiency
  );
  const health = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).health
  );
  const safety = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).safety
  );
  const waiters = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).waiters
  );
  const cookers = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).cookers
  );
  const cash = useStore((state) =>
    (state.restaurant.restaurant as Restaurant).getCash()
  );
  const settleAccountsMonthly = useStore((state) =>
    (state.restaurant.restaurant as Restaurant).settleAccountsMonthly()
  );
  const bank = useStore(
    (state) => (state.restaurant.restaurant as Restaurant).bank
  );

  const buttonsMap = useMemo(
    () => [
      {
        name: "餐厅详情",
        onClick: () => {
          setPageType("overview");
        },
      },
      {
        name: "员工信息",
        infos: [
          { name: "服务员人数", value: waiters.length },
          { name: "厨师人数", value: cookers.length },
        ],
        onClick: () => {
          setPageType("staff");
        },
      },
      {
        name: "资金状况",
        infos: [
          {
            name: "餐厅现金",
            value: cash,
            tip: "餐厅现金：餐厅账面上的现金数（包括贷款来的），任何交易都需要现金",
          },
          {
            name: "每月支出（估算）",
            value: settleAccountsMonthly.total,
            tip: "每月支出（估算）：包括员工工资、房租、装修的维护成本、每月贷款还款（包含该月本金）、食材采购（每个菜储备数量仅算1）",
          },
          {
            name: "餐厅贷款本金",
            value: bank.loans.reduce(
              (money, loan) =>
                (loan.value / loan.loanPeriod) * loan.remainingPeriod + money,
              0
            ),
            tip: "餐厅贷款本金：从银行贷款的金额（不包含已还的）",
          },
        ],
        onClick: () => {
          setPageType("funding");
        },
      },
    ],
    [
      health,
      safety,
      waiters.length,
      cookers.length,
      cash,
      settleAccountsMonthly.total,
    ]
  );

  return Page ? (
    <DetailWrapper>
      <Back
        onClick={() => {
          setPageType("");
        }}
      />
      <Page />
    </DetailWrapper>
  ) : (
    <EntryWrapper>
      <Grid>
        {buttonsMap.map((data) => (
          <Button key={data.name} onClick={data.onClick}>
            {data.name}
          </Button>
        ))}
      </Grid>
    </EntryWrapper>
  );
};
