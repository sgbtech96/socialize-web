/* eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { get } from "../../utils/request";
import ChatBubble from "../ChatBubble";
import styled from "styled-components";
import { Col } from "antd";
import { SocketContext } from "../../utils/SocketContext";

const Wrapper = styled(Col)`
  height: 90%;
  background-color: var(--blue-subtle);
  overflow-y: scroll;
  padding: 48px;
`;

const ChatArea = ({ activeChannelId }) => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const res = await get(`api/v1/chats/chat/${activeChannelId}`);
    if (res.type === "success") setChats(res.data);
  };
  useEffect(() => {
    console.log(activeChannelId);
    if (!activeChannelId) return;
    fetchChats();
  }, [activeChannelId]);

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
          <div key={idx} className={idx > 0 ? "mt-15" : ""}>
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
