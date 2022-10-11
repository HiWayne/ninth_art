import styled from "styled-components";
import { Column } from "./Column";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 80px);
  grid-template-rows: repeat(auto, 40px);
  gap: 10px;
`;

interface InfoData {
  name: string;
}

export interface ColumnData {
  name: string;
  info: InfoData[];
}

const columnsMap: ColumnData[] = [
  {
    name: "餐厅概况",
    info: [{ name: "餐厅形象" }, { name: "餐厅吸引力" }, { name: "餐厅卫生" }],
  },
  { name: "员工信息", info: [{ name: "服务员人数" }, { name: "厨师人数" }] },
  {
    name: "资金状况",
    info: [
      { name: "餐厅现金" },
      { name: "餐厅上月支出" },
      { name: "餐厅贷款" },
    ],
  },
];

export const Entry = () => {
  return (
    <Wrapper>
      <Columns>
        {columnsMap.map((data) => (
          <Column data={data} />
        ))}
      </Columns>
    </Wrapper>
  );
};
