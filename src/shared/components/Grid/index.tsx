import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DtIcon from "../Icon";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Card = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: #303133;
`;

interface Channel {
  image: string;
  name: string;
  path: string;
}

interface GridProps {
  channels: Channel[];
}

const Grid: FC<GridProps> = ({ channels }) => {
  return (
    <Wrapper>
      {channels.map((channel, index) => (
        <Link
          key={index}
          to={{ pathname: channel.path }}
          style={{ textDecoration: "none" }}
        >
          <Card>
            <DtIcon src={channel.image} width={80} height={80} />
            <span>{channel.name}</span>
          </Card>
        </Link>
      ))}
    </Wrapper>
  );
};

export default Grid;
