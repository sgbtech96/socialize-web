import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ChatArea from "../ChatArea";
import TextTool from "../TextTool";
import { io } from "socket.io-client";
import { SocketContext } from "../../utils/SocketContext";
import { SpinnerContext } from "../../utils/SpinnerContext";
import { ActiveChannelIdContext } from "../../utils/ActiveChannelIdContext";

let socket = null;
const Wrapper = styled(Row)``;
const Dashboard = () => {
  const setLoading = useContext(SpinnerContext);
  const [activeChannelId, setActiveChannelId] = useState(null);
  useEffect(() => {
    setLoading(true);
    socket = io(`${process.env.REACT_APP_BACKEND_BASE_URL}`, {
      auth: {
        token: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    socket?.on("connect", () => {
      setLoading(false);
      socket.emit("ONLINE");
    });
    return () => {
      socket?.off("connect");
    };
  }, []);
  return (
    socket && (
      <SocketContext.Provider value={socket}>
        <ActiveChannelIdContext.Provider
          value={{
            activeChannelId,
            setActiveChannelId,
          }}
        >
          <Wrapper>
            <Col span={24}>
              <Header />
            </Col>
            <Col xs={24} sm={20} md={10} lg={8} xl={8} xxl={6}>
              <Sidebar />
            </Col>
            <Col xs={24} sm={24} md={14} lg={16} xl={16} xxl={18}>
              <ChatArea activeChannelId={activeChannelId} />
              <TextTool activeChannelId={activeChannelId} />
            </Col>
          </Wrapper>
        </ActiveChannelIdContext.Provider>
      </SocketContext.Provider>
    )
  );
};

export default Dashboard;
