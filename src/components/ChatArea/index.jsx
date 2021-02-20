/* eslint disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get } from "../../utils/request";
import ChatBubble from "../ChatBubble";
import styled from "styled-components";
import { Col } from "antd";

const Wrapper = styled(Col)`
  overflow-y: scroll;
`;
const ChatArea = ({ socket, channelId }) => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const res = await get(`api/v1/chats/chat/${channelId}`);
    if (res.type === "success") setChats(res.data);
  };
  useEffect(() => {
    if (!channelId) return;
    fetchChats();
  }, [channelId]);

  useEffect(() => {
    socket.on("INCOMING_MESSAGE", (chat) => {
      setChats((prevState) => [...prevState, chat]);
    });
    return () => {
      socket.off("INCOMING_MESSAGE");
    };
  }, []);
  
  return (
    <Wrapper className="invisible-scroll">
      {chats.map((chat, idx) => {
        return (
          <div key={idx}>
            <ChatBubble chat={chat} />
          </div>
        );
      })}
    </Wrapper>
  );
};

ChatArea.propTypes = {
  channelId: PropTypes.string,
};

export default ChatArea;
