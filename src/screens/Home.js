import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  cavityAtom,
  factoryCodeAtom,
  inspectorNameAtom,
  lotNumberAtom,
  moldNumberAtom,
  noteAtom,
  partNumberAtom,
  processNumberAtom,
  productionDateAtom,
  productTypeAtom,
  specialtyAtom,
} from "../atom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tag from "../components/Tag";
import { dateFormate } from "../utils";

const Wrap = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 100px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 140vh;
  border: 1px solid black;
`;
const ReadContainer = styled.div`
  width: 40%;
  margin: 0px 20px;
`;
const ReadSectionTitle = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 10vh;
`;
const ExportContainer = styled(ReadContainer)``;
const ExportSectionTitle = styled(ReadSectionTitle)``;

const UploadFileBox = styled.label`
  border: 1px dashed white;
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  cursor: pointer;

  &:hover {
    border: 1px dashed aqua;
    i {
      color: aqua;
    }
  }
`;

const File = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  display: none;
`;

const FileIcon = styled.i`
  font-size: 38px;
  position: absolute;
`;

const FileName = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 10vh;
`;

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

const DataName = styled.span`
  font-size: large;
`;
const DataValue = styled(DataName)``;

export const BtnReadCsv = styled.button`
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  font-size: 14px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const MiddleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  margin: auto;
`;

const BtnExportCsv = styled(BtnReadCsv)``;

const Line = styled.div`
  border-left: 2px solid black;
`;

const InputData = styled.input`
  font-size: large;
`;

const SettingInfo = styled.form`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
`;

const SettingInfoItem = styled.div``;

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

  const [partNumber, setPartNumber] = useRecoilState(partNumberAtom);
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
    const inspectionDateTime = dateFormate(result[1]);
    const inspectionJudgment = result[4] === "Fail" || "NG" ? "F" : "A";
    const changeProductionType =
      productionType.split("/")[0] === "초품"
        ? "A"
        : productionType.split("/")[0] === "중품"
        ? "B"
        : "C";
    const changeFactoryCode = factoryCode === "1공장" ? "1" : "2";

    for (let i = 0; i < array.length; i++) {
      bottomRowData.push(`\n${partNumber}`);
      bottomRowData.push(`${processCode.split("/")[0]}`);
      bottomRowData.push(`${changeFactoryCode}`);
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
      bottomRowData.push(`${array[i][1]}`);
    }
  };

  const downLoadCSV = (e) => {
    if (partNumber === "") console.log("null");

    e.preventDefault();

    if (result.length === 0) {
      return console.log("no data");
    }
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

    //결과값 QMS 형식에 맞게 변경(RH->LH->엠보->TOP순서)
    const result = Object.entries(array[3]).slice(7, array[3].length);
    let finalResult = [];
    const arrayRH = result.filter((item) => {
      return item[0].split(":")[0] === "1";
    });
    const arrayLH = result.filter((item) => {
      return item[0].split(":")[0] === "2";
    });
    const arrayEmbo = result.filter((item) => {
      return item[0].split(":")[0] === "3";
    });
    const arrayTop = result.filter((item) => {
      return item[0].split(":")[0] === "4";
    });

    const count =
      arrayRH.length > arrayLH.length ? arrayRH.length : arrayLH.length;

    for (let i = 0; i < count; i++) {
      if (
        arrayRH[i][0].split(":")[1].split("-")[0].trim() ===
        arrayLH[i][0].split(":")[1].split("-")[0].trim()
      ) {
        finalResult.push(arrayRH[i]);
        finalResult.push(arrayLH[i]);
      } else {
        arrayLH.splice(i, 0, arrayRH[i]);
        i--;
      }
    }

    finalResult = [...new Set(finalResult)].concat(arrayEmbo).concat(arrayTop);

    setArray(finalResult);
    setResult(csvRows[3].split(","));
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file, "euc-kr");
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  const partNumberFormat = (str) => {
    let lastString = str[str.length - 1];
    let firstString = str.slice(0, -1);
    if (firstString.length !== 9) {
      firstString = firstString.padEnd(9, 0);
    }

    return firstString + lastString;
  };

  useEffect(() => {
    if (result.length !== 0) {
      const formatPartNumber = result[0].split("_")[1];
      const formatPartNumberResult = partNumberFormat(formatPartNumber);
      setPartNumber(formatPartNumberResult);
    }
  }, [array, result, headerKeys, file, productionType, setPartNumber]);

  const addIssues = () => {
    window.open(
      "https://github.com/Tinubee/measuredata-converter/issues",
      "_blank"
    );
  };

  return (
    <Wrap>
      <Header />
      <Container>
        <ReadContainer>
          <ReadSectionTitle>파일 불러오기</ReadSectionTitle>
          <UploadFileBox>
            <File></File>
            <FileIcon>
              <FontAwesomeIcon icon={faFile} />
            </FileIcon>
            <FileInput
              type={"file"}
              accept={".csv"}
              onChange={handleOnChange}
            />
          </UploadFileBox>
          <FileName>
            {file !== undefined ? file.name : "선택된 파일 없음"}
          </FileName>
          <BtnReadCsv
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            CSV 파일 읽기
          </BtnReadCsv>

          <GridBox>
            {array.length !== 0 ? (
              array.map((item, index) => (
                <ReadDataList key={index}>
                  <DataName>{item[0] + " = "}</DataName>
                  <DataValue>{item[1] === "" ? "X" : item[1]}</DataValue>
                </ReadDataList>
              ))
            ) : (
              <h1>데이터 없음</h1>
            )}
          </GridBox>
        </ReadContainer>
        <Line />
        <MiddleContainer>
          <BtnExportCsv
            onClick={(e) => {
              downLoadCSV(e);
            }}
          >
            변환 파일 다운로드
          </BtnExportCsv>
          <BtnReadCsv onClick={addIssues}>이슈등록</BtnReadCsv>
        </MiddleContainer>
        <Line />
        <ExportContainer>
          <ExportSectionTitle>파일 변환하기 설정</ExportSectionTitle>
          <Tag />
          <GridBox>
            <SettingInfo>
              <SettingInfoItem>
                품번 : <InputData value={partNumber} disabled required />
              </SettingInfoItem>
              <SettingInfoItem>
                공정코드 : <InputData value={processCode} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                공장코드 : <InputData value={factoryCode} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                금형번호 : <InputData value={moldNumber} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                Cavity : <InputData value={cavity} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                LOT No : <InputData value={lotNumber} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                생산일자(YYYYMMDD) :{" "}
                <InputData value={productionDate} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                초중종품(A:초품, B:중품, C:종품) :{" "}
                <InputData value={productionType} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                검사자명 : <InputData value={inspectorName} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                비고 : <InputData value={note} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                특기 : <InputData value={specialty} disabled />
              </SettingInfoItem>
            </SettingInfo>
          </GridBox>
        </ExportContainer>
      </Container>
      <Footer />
    </Wrap>
  );
}

export default Home;
