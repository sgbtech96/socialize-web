/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Row, Col } from "antd";
import { decodeJWT } from "../../utils/decodeJWT";

const Wrapper = styled(Col)`
  .box {
    display: inline-block;
    background-color: ${(props) =>
      props.isItMe ? "var(--blue)" : "var(--grey-subtle)"};
    color: ${(props) => (props.isItMe ? "var(--white)" : "var(--black-85)")};
    padding: 12px 16px;
    border-radius: 30px;
    ${(props) =>
      props.isItMe
        ? "border-bottom-right-radius: 0;"
        : "border-bottom-left-radius: 0;"}
    max-width: 60%;
    letter-spacing: 0.4px;
  }
  .light-black {
    color: var(--black-85);
  }
  .fade {
    color: var(--black-65);
  }
`;
const formatTime = (timeStamp) => moment(timeStamp).format("h:mm a");
const ChatBubble = ({ chat: { senderHandle, text, timeStamp } }) => {
  let isItMe = senderHandle === decodeJWT().handle;
  return (
    <Wrapper isItMe={isItMe} align={isItMe ? "" : "end"}>
      <div className={isItMe ? "ml-10" : "mr-10"}>
        <span className="mr-15 bold-15 light-black">{senderHandle}</span>
        <span className="normal-10 fade">{formatTime(timeStamp)}</span>
      </div>
      <span className="medium-12 box mt-5">{text}</span>
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
