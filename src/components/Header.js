import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import packageJson from "../../package.json";

const { ipcRenderer } = window;

const Top = styled.header`
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #494545;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
`;

const Version = styled.span`
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
`;

function Header() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    if (ipcRenderer != null) {
      ipcRenderer.send("app_version");
      ipcRenderer.on("app_version", (event, args) => {
        setVersion(args.version);
      });
    } else {
      setVersion(packageJson.version);
    }
  }, []);

  return (
    <Top>
      <Content>측정 데이터 변환 프로그램</Content>
      <Version>v{version}</Version>
    </Top>
  );
}

export default Header;
