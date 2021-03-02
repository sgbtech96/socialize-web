/* eslint-disable */
import React, { useState } from "react";
import { SpinnerContext } from "./utils/SpinnerContext";
import "antd/dist/antd.css";
import "./App.css";
import { Spin } from "antd";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px;
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("jwt") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/onboarding/login" />
        )
      }
    />
  );
};

const RedirectRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("jwt") ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  ></Route>
);

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <Wrapper>
      <SpinnerContext.Provider value={setLoading}>
        <Spin tip="Please wait..." spinning={loading}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/onboarding/login" />
              </Route>
              <RedirectRoute path="/onboarding" component={Onboarding} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/">
                <div>404 not found :(</div>
              </Route>
            </Switch>
          </Router>
        </Spin>
      </SpinnerContext.Provider>
    </Wrapper>
  );
}

export default App;
