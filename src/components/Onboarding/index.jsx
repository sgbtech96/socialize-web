import React from "react";
import { Switch, Route, Redirect, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import AuthCard from "./AuthCard";
import LoginCard from "./LoginCard";

import { Row, Col } from "antd";

const Wrapper = styled(Row)`
  height: 100vh;
  background-image: url("/home-background.svg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`;

const withGrid = (component) => (
  <Col xs={22} sm={16} md={12} lg={8} xxl={6} xxl={6}>
    {component}
  </Col>
);
const Onboarding = () => {
  const { path, url } = useRouteMatch();
  console.log(`url: ${url}, path: ${path}`);
  return (
    <Wrapper justify="center" align="middle">
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/login`} />
        </Route>
        <Route path={`${path}/send-otp`}>{withGrid(<AuthCard type="send" />)}</Route>
        <Route path={`${path}/verify-otp`}>
          {withGrid(<AuthCard type="verify" />)}
        </Route>
        <Route path={`${path}/register`}>
          {withGrid(<LoginCard type="register" />)}
        </Route>
        <Route path={`${path}/login`}>{withGrid(<LoginCard type="login" />)}</Route>
      </Switch>
    </Wrapper>
  );
};

export default Onboarding;
