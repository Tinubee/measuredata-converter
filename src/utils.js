export function dateFormate(date) {
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
}
