import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  height: 90px; /* 내용물에 따라 알맞는 값 설정 */
  bottom: 0px;
  position: absolute;
`;

function Footer() {
  return (
    <FooterContainer>
      <div>email : hyoungmin.kim@hkcb.co.kr</div>
      <div>&copy; {new Date().getFullYear()} Made by KIM HYOUNGMIN</div>
    </FooterContainer>
  );
}

export default Footer;
