const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const ProgressBar = require("electron-progressbar");

let mainWindow = null;
let progressBar = null;

// 자동으로 업데이트가 되는 것 방지
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on("error", (error) => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString()
  );
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDev,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  // mainWindow.setResizable(false);
  mainWindow.setResizable(false);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
};

ipcMain.on("app_version", (event) => {
  event.reply("app_version", { version: app.getVersion() });
});

// autoUpdater.on("checking-for-update", () => {
//   console.log("업데이트 확인 중");
// });

// autoUpdater.on("update-available", () => {
//   console.log("업데이트 버전 확인");
//   dialog
//     .showMessageBox({
//       type: "info",
//       title: "Update",
//       message:
//         "새로운 버전이 확인되었습니다. 설치 파일을 다운로드 하시겠습니까?",
//       buttons: ["지금 설치", "나중에 설치"],
//     })
//     .then((result) => {
//       const { response } = result;

//       if (response === 0) autoUpdater.downloadUpdate();
//     });
// });

// autoUpdater.on("update-not-available", () => {
//   console.log("업데이트 불가");
// });

// autoUpdater.once("download-progress", () => {
//   console.log("설치 중");

//   progressBar = new ProgressBar({
//     text: "Download 합니다.",
//   });

//   progressBar
//     .on("completed", () => {
//       console.log("설치 완료");
//     })
//     .on("aborted", () => {
//       console.log("aborted");
//     });
// });

// autoUpdater.on("update-downloaded", () => {
//   console.log("업데이트 완료");

//   if (progressBar != null) progressBar.setCompleted();

//   dialog
//     .showMessageBox({
//       type: "info",
//       title: "Update",
//       message: "새로운 버전이 다운로드 되었습니다. 다시 시작하시겠습니까?",
//       buttons: ["예", "아니오"],
//     })
//     .then((result) => {
//       const { response } = result;

//       if (response === 0) {
//         autoUpdater.quitAndInstall();
//         app.exit();
//       }
//     });
// });

// electron이 초기화 끝났을 때
app.on("ready", () => {
  createWindow();
  // autoUpdater.checkForUpdatesAndNotify();
});

// 모든 window가 종료되었을 때
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app이 활성화 되었을 때
app.on("activate", () => {
  if (!mainWindow) {
    createWindow();
  }
});
