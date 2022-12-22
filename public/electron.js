const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

let mainWindow;

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send("message", text);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
    },
    icon: __dirname + "/logo1024.png",
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
}

/* Updater ======================================================*/

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("업데이트 확인 중...");
});
autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("업데이트가 가능합니다.");
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("현재 최신버전입니다.");
});
autoUpdater.on("error", (err) => {
  sendStatusToWindow("에러가 발생하였습니다. 에러내용 : " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
  log_message = log_message + " - 현재 " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  sendStatusToWindow("업데이트가 완료되었습니다.");

  const option = {
    type: "question",
    buttons: ["업데이트", "취소"],
    defaultId: 0,
    title: "Updater",
    message: "업데이트가 있습니다. 프로그램을 업데이트 하시겠습니까?",
  };

  let btnIndex = dialog.showMessageBoxSync(mainWindow, option);

  if (btnIndex === 0) {
    autoUpdater.quitAndInstall();
  }
});

app.on("ready", async () => {
  createWindow();
  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
