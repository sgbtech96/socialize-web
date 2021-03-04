/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { get } from "../../../utils/request";
import ChatBubble from "./ChatBubble";
import styled from "styled-components";
import { Col } from "antd";
import Emitter from "../../../utils/emitter";
import Header from "./Header";
import { connect } from "react-redux";

const Wrapper = styled(Col)`
  height: calc(100vh - 24px - 84px - 72px);
  background-color: var(--blue-subtle);
  overflow-y: scroll;
  padding: 40px;
`;

const ChatArea = ({ activeChannelId }) => {
  const dummyDivRef = useRef(null);
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const res = await get(`api/v1/chats/chat/${activeChannelId}`);
    if (res.type === "success") {
      setChats(res.data);
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
      <Header />
      <Wrapper className="invisible-scroll">
        {chats.map((chat, idx) => {
          return (
            <div key={idx} className={idx > 0 ? "mt-15" : ""}>
              <ChatBubble chat={chat} />
            </div>
          );
        })}
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
