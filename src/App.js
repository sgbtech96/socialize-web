/* eslint-disable */
import { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Onboarding from "./components/Onboarding";

const Dashboard = () => <div>Dashboard!</div>;
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
  useEffect(() => {
    console.log("app!");
  });
  return (
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
  );
}

export default App;
