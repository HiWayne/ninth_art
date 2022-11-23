import { Staff } from "@/pages/Restaurant/entity";
import { Flex, Icon } from "shared/components";
import styled from "styled-components";
import starIcon from "../../../../../assets/images/icon/star.svg";

const Avatar = ({ src }: { src: string }) => (
  <Icon src={src} width={32} height={32} style={{ borderRadius: "50%" }} />
);

const Stars = styled(({ className, count }) => (
  <div className={className}>
    {new Array(count).fill(true).map((_, index) => (
      <Icon key={index} src={starIcon} width={16} height={16} />
    ))}
  </div>
))`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0 4px;
`;

const HeadInfo = styled(
  ({ className, data }: { className?: string; data: Staff }) => (
    <div className={className}>
      <Stars count={data.rarity} />
      <p>{data.name}</p>
    </div>
  )
)`
  margin-left: 8px;
`;

const MainInfo = styled.p`
  font-size: 14px;
`;

const StaffItem = styled(({ className, data }) => {
  return (
    <Flex className={className} direction="column">
      <Flex>
        <Avatar src={data.avatar} />
        <HeadInfo data={data} />
      </Flex>
      <Flex direction="column" align="flex-start"></Flex>
    </Flex>
  );
});

export const StaffList = ({ list }) => {
  return null;
};
