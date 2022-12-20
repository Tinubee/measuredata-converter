import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const GridBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const OverviewItem = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 10px;
  border-radius: 10px;
  &.active {
    color: ${(props) => props.theme.accentColor};
  }
  cursor: pointer;
`;

export const CancleButton = styled.div``;

function OverviewBox({ data }) {
  const [btnActive, setBtnActive] = useState("");
  console.log(data);
  const toggleActive = (e) => {
    setBtnActive(e.target.innerText);
  };

  useEffect(() => {
    console.log(btnActive);
  }, [btnActive]);

  return (
    <GridBox>
      <Overview>
        {data.map((item, index) => {
          return (
            <OverviewItem
              key={index}
              className={"btn" + (item === btnActive ? " active" : "")}
              value={index}
              onClick={toggleActive}
            >
              {item}
            </OverviewItem>
          );
        })}
      </Overview>
      <CancleButton>
        <Link to="/">❌</Link>
      </CancleButton>
    </GridBox>
  );
}

export default OverviewBox;
