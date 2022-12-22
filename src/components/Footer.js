import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  bottom: 0px;
  position: absolute;
  height: 10vh;
  padding: 0 20px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Footer() {
  const developmentDate = 2022;
  return (
    <FooterContainer>
      <div>
        <FontAwesomeIcon icon={faPhone} /> Phone : 010-3190-4202
      </div>
      <div>📩 Email : hyoungmin.kim@hkcb.co.kr</div>
      <hr />
      <FooterBottom>
        <div>
          &copy; {developmentDate}-{new Date().getFullYear()} KIM HYOUNG MIN.All
          rights reserved.
        </div>
        <div>test</div>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
