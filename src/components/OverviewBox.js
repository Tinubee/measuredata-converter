import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {
  cavityAtom,
  factoryCodeAtom,
  inspectorNameAtom,
  lotNumberAtom,
  moldNumberAtom,
  noteAtom,
  processNumberAtom,
  productionDateAtom,
  productTypeAtom,
  specialtyAtom,
} from "../atom";

export const GridBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Container = styled.div``;

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

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Input = styled.input`
  font-size: 14px;
  border-radius: 5px;
  padding: 5px;
`;

export const Button = styled.button`
  font-size: 20px;
  background-color: black;
  color: white;
  border-radius: 5px;
`;

const Calendar = styled(DatePicker)`
  border-radius: 8px;
  padding: 3px 10px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  font-size: large;
`;

const CalendarForm = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

function OverviewBox({ data }) {
  const { pathname } = useLocation();
  const [btnActive, setBtnActive] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const setProcessCode = useSetRecoilState(processNumberAtom);
  const setFactoryCode = useSetRecoilState(factoryCodeAtom);
  const setMoldNumber = useSetRecoilState(moldNumberAtom);
  const setCavity = useSetRecoilState(cavityAtom);
  const setLotNumber = useSetRecoilState(lotNumberAtom);
  const [productionDate, setProductionDate] =
    useRecoilState(productionDateAtom);
  const setProductionType = useSetRecoilState(productTypeAtom);
  const setInspectorName = useSetRecoilState(inspectorNameAtom);
  const setNote = useSetRecoilState(noteAtom);
  const setSpecialty = useSetRecoilState(specialtyAtom);
  const [startDate, setStartDate] = useState(new Date());

  const toggleActive = (e) => {
    setBtnActive(e.target.innerText);
    if (pathname === "/processcode") {
      setProcessCode(e.target.innerText);
    } else if (pathname === "/factorycode") {
      setFactoryCode(e.target.innerText);
    } else if (pathname === "/producttype") {
      setProductionType(e.target.innerText);
    }
  };

  useEffect(() => {}, [
    btnActive,
    pathname,
    setProcessCode,
    setFactoryCode,
    setProductionType,
    productionDate,
  ]);

  const handleValid = ({ value }) => {
    if (pathname === "/inspectorname") {
      setInspectorName(value);
    } else if (pathname === "/moldnumber") {
      setMoldNumber(value);
    } else if (pathname === "/cavity") {
      setCavity(value);
    } else if (pathname === "/lotnumber") {
      setLotNumber(value);
    } else if (pathname === "/productiondate") {
      setProductionDate(value);
    } else if (pathname === "/note") {
      setNote(value);
    } else if (pathname === "/specialty") {
      setSpecialty(value);
    }
    setValue("value", "");
  };

  const dateToString = (date) => {
    setStartDate(date);
    setProductionDate(date.toISOString().slice(0, 10).replace(/-/g, ""));
  };

  return (
    <GridBox>
      <Container>
        {data.length === 0 ? (
          pathname === "/productiondate" ? (
            <CalendarForm>
              <Calendar
                selected={startDate}
                dateFormat="yyyy년 MM월 dd일"
                onChange={(date) => dateToString(date)}
                maxDate={new Date()}
                locale={ko}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </CalendarForm>
          ) : (
            <Form onSubmit={handleSubmit(handleValid)}>
              <Input
                {...register("value", {
                  required: "값을 입력해주세요.",
                })}
                placeholder="입력하기..."
              />
              <Button>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form>
          )
        ) : (
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
        )}
      </Container>
      <CancleButton>
        <Link to="/">❌</Link>
      </CancleButton>
    </GridBox>
  );
}

export default OverviewBox;
