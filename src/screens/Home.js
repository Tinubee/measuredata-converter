import { useEffect, useState } from "react";

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

  const fileReader = new FileReader("UTF8");

  const BottomDataSet = () => {
    const partNumber = result[0].split("_")[1];
    const inspectionItemList = headerKeys.slice(7, headerKeys.length);
    const inspectionItemResult = result.slice(7, result.length);
    const inspectionDateTime = DateFormat(result[1]);
    const inspectionJudgment = result[4] === "Fail" ? "F" : "A";

    for (let i = 0; i < inspectionItemList.length; i++) {
      bottomRowData.push(`\n${partNumber}`);
      bottomRowData.push(`공정코드`);
      bottomRowData.push(`공장코드`);
      bottomRowData.push(`금형번호`);
      bottomRowData.push(`Cavity`);
      bottomRowData.push(`LOT Number`);
      bottomRowData.push(`${inspectionDateTime}`);
      bottomRowData.push(`생산일자`);
      bottomRowData.push(`초중종품`);
      bottomRowData.push(`검사자명`);
      bottomRowData.push(`${inspectionJudgment}`);
      bottomRowData.push(``);
      bottomRowData.push(``);
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
    console.log(result);
  }, [array, result, headerKeys]);

  return (
    <div>
      <form>
        <input type={"file"} accept={".csv"} onChange={handleOnChange} />
      </form>
      <button
        onClick={(e) => {
          handleOnSubmit(e);
        }}
      >
        Read CSV File
      </button>
      <button
        onClick={(e) => {
          downLoadCSV(e);
        }}
      >
        Export CSV
      </button>

      <div>
        {headerKeys.map((item, index) => (
          <div key={index}>
            <span>{item} = </span>
            <span>{result[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
