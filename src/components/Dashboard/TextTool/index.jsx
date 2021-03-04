import React, { useContext, useState } from "react";
import Icon from "react-icons-kit";
import { send } from "react-icons-kit/fa/send";
import styled from "styled-components";
import { Row, Col, Input } from "antd";
import { SocketContext } from "../../../utils/contexts/SocketContext";
import { connect } from "react-redux";

const Wrapper = styled(Row)`
  height: 72px;
  padding: 0 16px;
  background-color: var(--white);
  .ant-input {
    border: none;
    padding: 12px;
  }
  .tool-icon {
    background-color: var(--blue-subtle);
    color: var(--blue);
    padding: 16px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const TypingTool = ({ activeChannelId }) => {
  const socket = useContext(SocketContext);
  const [text, setText] = useState("");
  const handleMessageSend = () => {
    let textMessage = text.trim();
    if (!textMessage.length) return;
    socket.emit("SEND_MESSAGE", activeChannelId, textMessage);
    setText("");
  };
  return (
    <Wrapper gutter={8} align="middle" justify="space-between">
      <Col span={22}>
        <Input
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleMessageSend}
        />
      </Col>
      <Col span={2} align="middle">
        <Icon
          icon={send}
          size={20}
          className="tool-icon"
          onClick={handleMessageSend}
        />
      </Col>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    activeChannelId: state.dashboard.activeFriendProfile.data?.channelId,
  };
};
export default connect(mapStateToProps, null)(TypingTool);
