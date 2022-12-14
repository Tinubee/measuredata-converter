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
  const topRow = ["V", "", "????????????", ""];
  const topRowData = [
    ["\nA01", "??????", 1, "1??????"],
    ["\nA02", "??????", 2, "2??????"],
    ["\nA03", "?????????"],
    ["\nA04", "??????"],
    ["\nA05", "?????????"],
    ["\nA06", "?????????"],
    ["\nA07", "????????????"],
    ["\nA08", "????????????"],
    ["\nA09", "??????"],
    ["\nA10", "??????"],
    ["\nA11", "??????"],
    ["\nA12", "??????"],
    ["\nA13", "?????????"],
    ["\nA14", "??????"],
    ["\nA15", "STEEL"],
    ["\nA16", "RESIN"],
    ["\nA17", "?????????"],
  ];
  const bottomRow = [
    "\n??????",
    "????????????",
    "????????????",
    "????????????",
    "Cavity",
    "LOT No",
    "????????????(YYYYMMDD HHMI)",
    "????????????(YYYYMMDD)",
    '"????????????(A:??????, B:??????, C:??????)"',
    "????????????",
    '"??????(??????:A, ?????????:F)"',
    "??????",
    "??????",
    "??????????????????",
    "?????????1",
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
      productionType.split("/")[0] === "??????"
        ? "A"
        : productionType.split("/")[0] === "??????"
        ? "B"
        : "C";
    const changeFactoryCode = factoryCode === "1??????" ? "1" : "2";

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

    //?????? ????????? ????????? ?????? BOM ????????????
    const BOM = "\uFEFF";
    csv = BOM + csv;

    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = "test"; // ?????????
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

    //????????? QMS ????????? ?????? ??????(RH->LH->??????->TOP??????)
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
          <ReadSectionTitle>?????? ????????????</ReadSectionTitle>
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
            {file !== undefined ? file.name : "????????? ?????? ??????"}
          </FileName>
          <BtnReadCsv
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            CSV ?????? ??????
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
              <h1>????????? ??????</h1>
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
            ?????? ?????? ????????????
          </BtnExportCsv>
          <BtnReadCsv onClick={addIssues}>????????????</BtnReadCsv>
        </MiddleContainer>
        <Line />
        <ExportContainer>
          <ExportSectionTitle>?????? ???????????? ??????</ExportSectionTitle>
          <Tag />
          <GridBox>
            <SettingInfo>
              <SettingInfoItem>
                ?????? : <InputData value={partNumber} disabled required />
              </SettingInfoItem>
              <SettingInfoItem>
                ???????????? : <InputData value={processCode} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ???????????? : <InputData value={factoryCode} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ???????????? : <InputData value={moldNumber} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                Cavity : <InputData value={cavity} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                LOT No : <InputData value={lotNumber} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ????????????(YYYYMMDD) :{" "}
                <InputData value={productionDate} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ????????????(A:??????, B:??????, C:??????) :{" "}
                <InputData value={productionType} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ???????????? : <InputData value={inspectorName} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ?????? : <InputData value={note} disabled />
              </SettingInfoItem>
              <SettingInfoItem>
                ?????? : <InputData value={specialty} disabled />
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
