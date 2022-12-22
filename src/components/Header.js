import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
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

function Header() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    ipcRenderer.send("app_version");

    ipcRenderer.on("app_version", (event, args) => {
      setVersion(args.version);
    });
  }, []);

  return (
    <Top>
      <span>v{version}</span>
      <Content>측정 데이터 변환 프로그램</Content>
    </Top>
  );
}

export default Header;
