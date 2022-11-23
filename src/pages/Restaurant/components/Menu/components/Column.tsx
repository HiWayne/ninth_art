import styled from "styled-components";
import { ColumnData } from "./Entry";
import Icon from "shared/components/Icon";
import { Modal } from "../../Modal";
import { useCallback, useState } from "react";
import helpIcon from "../../../assets/images/icon/help.svg";

const Wrapper = styled.div`
  margin-bottom: 10px;
  border: 1px solid #eee;
`;

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
`;

const LookMore = styled.span`
  font-size: 14px;
  font-weight: normal;
  text-decoration: underline;
`;

const Info = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  cursor: pointer;
`;

const Tip = ({ ...props }) => {
  return <Icon src={helpIcon} width={16} height={16} {...props} />;
};

export const Column = ({ data }: { data: ColumnData }) => {
  const [tip, setTip] = useState("");

  const onShow = useCallback((tip) => {
    setTip(tip);
  }, []);

  const onClose = useCallback(() => {
    console.log('close')
    setTip("");
  }, []);

  return (
    <Wrapper>
      <Title>
        <span>{data.name}</span>
      </Title>
      {data.infos.map((info) => (
        <>
          <Info key={info.name}>
            {info.name}
            {info.tip ? <Tip onClick={() => onShow(info.tip)} /> : null}：
            {info.value}
          </Info>
        </>
      ))}
      {tip ? (
        <Modal onClose={onClose}>
          <p>{tip}</p>
        </Modal>
      ) : null}
    </Wrapper>
  );
};
