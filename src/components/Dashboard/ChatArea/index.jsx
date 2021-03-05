/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { get } from "../../../utils/request";
import ChatBubble from "./ChatBubble";
import styled from "styled-components";
import { Col } from "antd";
import Emitter from "../../../utils/emitter";
import Header from "../Header";
import { connect } from "react-redux";
import { List } from "react-content-loader";

const Wrapper = styled(Col)`
  height: calc(100vh - 24px - 84px - 72px);
  background-color: var(--blue-subtle);
  overflow-y: scroll;
  padding: 40px;
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 84px - 72px);
    padding: 20px;
  }
`;

let skeletons = [1, 2, 3, 4];
const ChatArea = ({ activeChannelId }) => {
  const dummyDivRef = useRef(null);
  const [chats, setChats] = useState(null);
  const fetchChats = async () => {
    const res = await get(`api/v1/chats/chat/${activeChannelId}`);
    if (res.type === "success") {
      setChats(res.data || []);
      dummyDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleIncomingMessage = (message, channelId) => {
    if (channelId !== activeChannelId) return;
    setChats((prevState) => [...prevState, message]);
    dummyDivRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (!activeChannelId) return;
    fetchChats();
  }, [activeChannelId]);

  useEffect(() => {
    Emitter.on("INCOMING_MESSAGE", ({ message, channelId }) => {
      handleIncomingMessage(message, channelId);
    });
    return () => {
      Emitter.off("INCOMING_MESSAGE");
    };
  }, [activeChannelId]);

  return (
    <>
      <Header type="chat-area" />
      <Wrapper className="invisible-scroll">
        {chats
          ? chats.map((chat, idx) => {
              return (
                <div key={idx} className={idx > 0 ? "mt-15" : ""}>
                  <ChatBubble chat={chat} />
                </div>
              );
            })
          : activeChannelId &&
            skeletons.map((i) => (
              <Col key={i}>
                <List
                  backgroundColor={"var(--grey-subtle)"}
                  foregroundColor={"var(--grey)"}
                />
              </Col>
            ))}
        <div ref={dummyDivRef}></div>
      </Wrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    activeChannelId: state.dashboard.activeFriendProfile.data?.channelId,
  };
};
export default connect(mapStateToProps, null)(ChatArea);
