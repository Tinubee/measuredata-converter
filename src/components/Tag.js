import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import OverviewBox from "./OverviewBox";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 5px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 10px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

function Tag() {
  const processcodeMatch = useRouteMatch("/processcode");
  const factorycodeMatch = useRouteMatch("/factorycode");
  const moldnumberMatch = useRouteMatch("/moldnumber");
  const cavityMatch = useRouteMatch("/cavity");
  const lotnumberMatch = useRouteMatch("/lotnumber");
  const productiondateMatch = useRouteMatch("/productiondate");
  const producttypeMatch = useRouteMatch("/producttype");
  const inspectornameMatch = useRouteMatch("/inspectorname");
  const noteMatch = useRouteMatch("/note");
  const specialtyMatch = useRouteMatch("/specialty");

  const processcode = [
    "A01/조립",
    "A02/선별",
    "A03/완제품",
    "A04/사출",
    "A05/프레스",
    "A06/열처리",
    "A07/용접대기",
    "A08/용접완료",
    "A09/코팅",
    "A10/도금",
    "A11/태핑",
    "A12/도장",
    "A13/스프링",
    "A14/바렐",
    "A15/STEEL",
    "A16/RESIN",
    "A17/부재료",
  ];

  const factorycode = ["1공장", "2공장"];
  const producttype = ["초품/A", "중품/B", "종품/C"];

  return (
    <div>
      <Tabs>
        <Tab isActive={processcodeMatch !== null}>
          <Link to={`/processcode`}>공정코드</Link>
        </Tab>
        <Tab isActive={factorycodeMatch !== null}>
          <Link to={`/factorycode`}>공장코드</Link>
        </Tab>
        <Tab isActive={moldnumberMatch !== null}>
          <Link to={`/moldnumber`}>금형번호</Link>
        </Tab>
        <Tab isActive={cavityMatch !== null}>
          <Link to={`/cavity`}>Cavity</Link>
        </Tab>
        <Tab isActive={lotnumberMatch !== null}>
          <Link to={`/lotnumber`}>LOT No</Link>
        </Tab>
        <Tab isActive={productiondateMatch !== null}>
          <Link to={`/productiondate`}>생산일자</Link>
        </Tab>
        <Tab isActive={producttypeMatch !== null}>
          <Link to={`/producttype`}>초중종품</Link>
        </Tab>
        <Tab isActive={inspectornameMatch !== null}>
          <Link to={`/inspectorname`}>검사자명</Link>
        </Tab>
        <Tab isActive={noteMatch !== null}>
          <Link to={`/note`}>비고</Link>
        </Tab>
        <Tab isActive={specialtyMatch !== null}>
          <Link to={`/specialty`}>특기</Link>
        </Tab>
      </Tabs>

      <Switch>
        <Route path={`/processcode`}>
          <OverviewBox data={processcode} />
        </Route>
        <Route path={`/factorycode`}>
          <OverviewBox data={factorycode} />
        </Route>
        <Route path={`/moldnumber`}>
          <OverviewBox data={[]} />
        </Route>
        <Route path={`/cavity`}>
          <OverviewBox data={[]} />
        </Route>
        <Route path={`/lotnumber`}>
          <OverviewBox data={[]} />
        </Route>
        <Route path={`/productiondate`}>
          <OverviewBox data={[]} />
        </Route>
        <Route path={`/producttype`}>
          <OverviewBox data={producttype} />
        </Route>
        <Route path={`/inspectorname`}>
          <OverviewBox data={[]} />
        </Route>
        <Route path={`/note`}>
          <OverviewBox data={[]} />
        </Route>
        <Route path={`/specialty`}>
          <OverviewBox data={[]} />
        </Route>
      </Switch>
    </div>
  );
}

export default Tag;
