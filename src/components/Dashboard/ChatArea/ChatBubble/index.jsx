import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Row, Col } from "antd";
import { decodeJWT } from "../../../../utils/decodeJWT";

const Wrapper = styled(Col)`
  .message-box {
    display: inline-block;
    background-color: ${(props) =>
      props.isItMe ? "var(--blue)" : "var(--grey-subtle)"};
    padding: 12px 16px;
    border-radius: 30px;
    ${(props) =>
      props.isItMe
        ? "border-bottom-right-radius: 0;"
        : "border-bottom-left-radius: 0;"}
    max-width: 60%;
    .message {
      width: 100%;
      overflow-wrap: break-word;
      color: ${(props) => (props.isItMe ? "var(--white)" : "var(--black-85)")};
      letter-spacing: 0.4px;
      font-size: 12px !important;
    }
  }
  .light-black {
    color: var(--black-85);
  }
  .fade {
    color: var(--black-65);
  }
  .size-10 {
    font-size: 10px !important;
  }
`;
const formatTime = (timeStamp) => moment(timeStamp).format("L h:mm a");
const ChatBubble = ({ chat: { senderHandle, text, timeStamp } }) => {
  let isItMe = senderHandle === decodeJWT().handle;
  return (
    <Wrapper isItMe={isItMe} align={isItMe ? "" : "end"}>
      <div className={isItMe ? "ml-10" : "mr-10"}>
        <span className="mr-15 bold-15 light-black">{senderHandle}</span>
        <span className="normal-10 fade size-10">{formatTime(timeStamp)}</span>
      </div>
      <span className="message-box mt-5">
        <div className="medium-12 message">{text}</div>
      </span>
    </Wrapper>
  );
};

export default ChatBubble;
