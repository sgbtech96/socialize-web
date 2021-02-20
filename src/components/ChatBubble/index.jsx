/* eslint disable */
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Col } from "antd";

const Wrapper = styled(Col)``;
const formatTime = (timeStamp) => moment(timeStamp).format("h:mm a");
const ChatBubble = ({ chat: { sender, text, timeStamp } }) => {
  return (
    <Wrapper>
      <div>{sender}</div>
      <div>{text}</div>
      <div>{formatTime(timeStamp)}</div>
    </Wrapper>
  );
};

ChatBubble.propTypes = {
  chat: {
    sender: PropTypes.string,
    text: PropTypes.string,
    timeStamp: PropTypes.any,
  },
};

export default ChatBubble;
