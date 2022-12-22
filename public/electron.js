const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

let mainWindow;

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

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // mainWindow.setResizable(true);
  // mainWindow.on("closed", () => (mainWindow = null));
  // mainWindow.focus();
}

/* Updater ======================================================*/

autoUpdater.on("checking-for-update", () => {
  log.info("업데이트 확인 중...");
});
autoUpdater.on("update-available", (info) => {
  log.info("업데이트가 가능합니다.");
});
autoUpdater.on("update-not-available", (info) => {
  log.info("현재 최신버전입니다.");
});
autoUpdater.on("error", (err) => {
  log.info("에러가 발생하였습니다. 에러내용 : " + err);
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
  log.info(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  log.info("업데이트가 완료되었습니다.");
});

app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
