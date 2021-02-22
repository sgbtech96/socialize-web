import React, { useState } from "react";
// import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { ic_face } from "react-icons-kit/md/ic_face";
import { send } from "react-icons-kit/fa/send";
import styled from "styled-components";
import { Row, Col, Input } from "antd";
import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";

const Wrapper = styled(Row)`
  padding: 24px;
  background-color: var(--white);
  .ant-input {
    border: none;
    padding: 12px;
  }
  .tool-icon {
    background-color: var(--blue-subtle);
    color: var(--blue);
    padding: 4px 6px;
    border-radius: 50%;
  }
`;

const TypingTool = ({ socket, channelId }) => {
  const [text, setText] = useState("");
  const handleMessageSend = () => {
    if (!text.length) return;
    socket.emit("SEND_MESSAGE", channelId, text);
    setText("");
  };
  return (
    <Wrapper gutter={8} align="middle">
      <Col span={2}>
        <Icon icon={ic_face} size={32} className="tool-icon" />
      </Col>
      <Col span={20}>
        <Input
          placeholder="Write your message..."
          value={text}
          onChange={setText}
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

TypingTool.propTypes = {};

export default TypingTool;
