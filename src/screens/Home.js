import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
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
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tag from "../components/Tag";

const Wrap = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 100px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
`;
const ReadContainer = styled.div`
  width: 40%;
`;
const ReadSectionTitle = styled.div``;
const ExportContainer = styled(ReadContainer)``;
const ExportSectionTitle = styled.div``;
const GridBox = styled.div`
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  overflow-y: auto;
  max-height: 90vh;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background: ${(props) => props.theme.bgColor};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.textColor};
    border-radius: 10px;
  }
`;

const ReadDataList = styled.div``;

const BtnReadCsv = styled.button`
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  font-size: 14px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;
const BtnExportCsv = styled(BtnReadCsv)`
  margin: auto;
`;

function Home() {
  const topRow = ["V", "", "공장코드", ""];
  const topRowData = [
    ["\nA01", "조립", 1, "1공장"],
    ["\nA02", "선별", 2, "2공장"],
    ["\nA03", "완제품"],
    ["\nA04", "사출"],
    ["\nA05", "프레스"],
    ["\nA06", "열처리"],
    ["\nA07", "용접대기"],
    ["\nA08", "용접완료"],
    ["\nA09", "코팅"],
    ["\nA10", "도금"],
    ["\nA11", "태핑"],
    ["\nA12", "도장"],
    ["\nA13", "스프링"],
    ["\nA14", "바렐"],
    ["\nA15", "STEEL"],
    ["\nA16", "RESIN"],
    ["\nA17", "부재료"],
  ];
  const bottomRow = [
    "\n품번",
    "공정코드",
    "공장코드",
    "금형번호",
    "Cavity",
    "LOT No",
    "검사일시(YYYYMMDD HHMI)",
    "생산일자(YYYYMMDD)",
    '"초중종품(A:초품, B:중품, C:종품)"',
    "검사자명",
    '"판정(합격:A, 불합격:F)"',
    "비고",
    "특기",
    "검사항목코드",
    "측정치1",
  ];
  let bottomRowData = [];
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [result, setResult] = useState([]);

  const processCode = useRecoilValue(processNumberAtom);
  const factoryCode = useRecoilValue(factoryCodeAtom);
  const moldNumber = useRecoilValue(moldNumberAtom);
  const cavity = useRecoilValue(cavityAtom);
  const lotNumber = useRecoilValue(lotNumberAtom);
  const productionDate = useRecoilValue(productionDateAtom);
  const productionType = useRecoilValue(productTypeAtom);
  const inspectorName = useRecoilValue(inspectorNameAtom);
  const note = useRecoilValue(noteAtom);
  const specialty = useRecoilValue(specialtyAtom);

  const fileReader = new FileReader("UTF8");

  const BottomDataSet = () => {
    const partNumber = result[0].split("_")[1];
    const inspectionItemList = headerKeys.slice(7, headerKeys.length);
    const inspectionItemResult = result.slice(7, result.length);
    const inspectionDateTime = DateFormat(result[1]);
    const inspectionJudgment = result[4] === "Fail" ? "F" : "A";
    const changeProductionType =
      productionType === "초품" ? "A" : productionType === "중품" ? "B" : "C";

    for (let i = 0; i < inspectionItemList.length; i++) {
      bottomRowData.push(`\n${partNumber}`);
      bottomRowData.push(`${processCode.split("/")[0]}`);
      bottomRowData.push(`${factoryCode}`);
      bottomRowData.push(`${moldNumber}`);
      bottomRowData.push(`${cavity}`);
      bottomRowData.push(`${lotNumber}`);
      bottomRowData.push(`${inspectionDateTime}`);
      bottomRowData.push(`${productionDate}`);
      bottomRowData.push(`${changeProductionType}`);
      bottomRowData.push(`${inspectorName}`);
      bottomRowData.push(`${inspectionJudgment}`);
      bottomRowData.push(`${note}`);
      bottomRowData.push(`${specialty}`);
      bottomRowData.push(`${i}`);
      bottomRowData.push(`${inspectionItemResult[i]}`);
    }
  };

  const downLoadCSV = (e) => {
    e.preventDefault();
    let csv = [];
    BottomDataSet();

    csv.push(topRow);
    csv.push(topRowData);
    csv.push(bottomRow);
    csv.push(bottomRowData);
    let csvFile;
    let downloadLink;

    //한글 처리를 해주기 위해 BOM 추가하기
    const BOM = "\uFEFF";
    csv = BOM + csv;

    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = "test"; // 파일명
    downloadLink.href = window.URL.createObjectURL(csvFile);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    downloadLink.dispatchEvent(clickEvt);
    downloadLink.remove();
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    setResult(csvRows[3].split(","));
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(":Ddd");
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file, "euc-kr");
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  const DateFormat = (date) => {
    let formatDateTime = "";
    const splitDate = date.split(" ");
    const splitTime = splitDate[2].split(":");

    let resultDate = splitDate[0].replace(/-/g, "");
    let resultTime = "";

    if (splitDate[1] === "오전") {
      resultTime = splitTime[0] + splitTime[1];
    } else {
      splitTime[0] = (parseInt(splitTime[0]) + 12).toString();
      resultTime = splitTime[0] + splitTime[1];
    }

    formatDateTime = resultDate + " " + resultTime;

    return formatDateTime;
  };

  useEffect(() => {
    console.log(headerKeys);
  }, [array, result, headerKeys]);

  return (
    <Wrap>
      <Header />
      <Container>
        <ReadContainer>
          <ReadSectionTitle>파일 불러오기</ReadSectionTitle>
          <input type={"file"} accept={".csv"} onChange={handleOnChange} />
          <BtnReadCsv
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            CSV 파일 읽기
          </BtnReadCsv>

          <GridBox>
            {headerKeys.map((item, index) => (
              <ReadDataList key={index}>
                <span>{item === "" ? "" : item + " = "}</span>
                <span>{result[index] === "" ? "X" : result[index]}</span>
              </ReadDataList>
            ))}
          </GridBox>
        </ReadContainer>
        <BtnExportCsv
          onClick={(e) => {
            downLoadCSV(e);
          }}
        >
          변환 파일 다운로드
        </BtnExportCsv>
        <ExportContainer>
          <ExportSectionTitle>파일 변환하기 설정</ExportSectionTitle>
          <Tag />
          <GridBox>
            <div>
              <div>공정코드 : {processCode}</div>
              <div>공장코드 : {factoryCode}</div>
              <div>금형번호 : {moldNumber}</div>
              <div>Cavity : {cavity}</div>
              <div>LOT No : {lotNumber}</div>
              <div>생산일자(YYYYMMDD) : {productionDate}</div>
              <div>초중종품(A:초품, B:중품, C:종품) : {productionType}</div>
              <div>검사자명 : {inspectorName}</div>
              <div>비고 : {note}</div>
              <div>특기 : {specialty}</div>
            </div>
          </GridBox>
        </ExportContainer>
      </Container>
      <Footer />
    </Wrap>
  );
}

export default Home;
