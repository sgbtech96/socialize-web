/* eslint-disable */
import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import LoginCard from "../components/LoginCard";
import AuthCard from "../components/AuthCard";
import UserCard from "../components/UserCard";
import TrendingSwipe from "../components/TrendingSwipe";
import SwitchButton from "../components/SwitchButton";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

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
      <Row>
        <Col xs={24} sm={24} md={13} lg={10} xl={8} xxl={6}>
          {/* <LoginCard type="login" /> */}
          {/* <AuthCard type="send" /> */}
          {/* <UserCard /> */}
          {/* <TrendingSwipe /> */}
          {/* <SwitchButton text="Direct" /> */}
          {/* <SearchBar /> */}
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
}

export default App;
