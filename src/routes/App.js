/* eslint-disable */
import logo from "../logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import LoginCard from "../components/LoginCard";
import { Row, Col } from "antd";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/home-background.svg')",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Row justify="center mt-50">
        <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
          <LoginCard />
        </Col>
      </Row>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
