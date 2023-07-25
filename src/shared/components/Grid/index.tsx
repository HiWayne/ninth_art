import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DtIcon from "../Icon";

const Wrapper = styled.div`
  margin-left: -24px;
  margin-top: -24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  margin-left: 24px;
  margin-top: 24px;
  width: 80px;
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

export const Grid: FC<GridProps> = ({ channels }) => {
  return (
    <Wrapper>
      {channels.map((channel, index) => (
        <Link
          key={index}
          to={{ pathname: channel.path }}
          style={{ textDecoration: "none" }}
        >
          <Card>
            <DtIcon
              src={channel.image}
              width={80}
              height={80}
              style={{ borderRadius: "12px", overflow: "hidden" }}
            />
            <span
              style={{ marginTop: "4px", color: "#333", fontWeight: "bold" }}
            >
              {channel.name}
            </span>
          </Card>
        </Link>
      ))}
    </Wrapper>
  );
};

export default Grid;
