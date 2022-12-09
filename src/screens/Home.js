import { useState } from "react";

function Home() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [result, setResult] = useState([]);

  const fileReader = new FileReader("UTF8");

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
    console.log(array);
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
  return (
    <div>
      <form>
        <input type={"file"} accept={".csv"} onChange={handleOnChange} />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Read CSV File
        </button>
      </form>

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
