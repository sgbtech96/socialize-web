import React, { useState } from "react";
import { SpinnerContext } from "./utils/contexts/SpinnerContext";
import "antd/dist/antd.css";
import "./App.css";
import { Spin } from "antd";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";

const store = makeStore();

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
    <SpinnerContext.Provider value={setLoading}>
      <Spin tip="Please wait..." spinning={loading}>
        <Provider store={store}>
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
        </Provider>
      </Spin>
    </SpinnerContext.Provider>
  );
}

export default App;
