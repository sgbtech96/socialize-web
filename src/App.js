/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import LoginCard from "../components/LoginCard";
import AuthCard from "../components/AuthCard";
import Sidebar from "../components/Sidebar";
import TextTool from "../components/TextTool";

function App() {
  return (
    <div
      style={{
        // height: "100vh",
        // backgroundImage: "url('/home-background.svg')",
        // backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed",
        // backgroundPosition: "center",
        backgroundColor: "var(--blue-subtle)",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={24} md={13} lg={10} xl={8} xxl={6}>
          {/* <LoginCard type="login" /> */}
          {/* <AuthCard type="send" /> */}
          {/* <UserCard /> */}
          {/* <TrendingSwipe /> */}
          {/* <SwitchButton text="Direct" /> */}
          {/* <SearchBar /> */}
          <Sidebar />
        </Col>
        <Col xs={24} sm={24} md={11} lg={14} xl={16} xxl={18}>
          <div>asdfghjkl</div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <TextTool />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
