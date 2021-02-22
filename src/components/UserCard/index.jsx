import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Col, message } from "antd";
import Icon from "react-icons-kit";
import { userPlus } from "react-icons-kit/feather/userPlus";
import { checkCircleO } from "react-icons-kit/fa/checkCircleO";
import Emitter from "../../utils/emitter";

const Wrapper = styled(Row)`
  cursor: pointer;
  padding: 10px 20px;
  max-width: 400px;
  border-bottom: 1px solid var(--grey);
  :hover {
    background-color: var(--blue-subtle);
    border-left: 4px solid var(--blue);
    padding-left: 16px;
  }
  .light-black {
    color: var(--black-65);
  }
  .fade {
    color: var(--black-45);
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }
  .unread-box {
    display: inline-block;
    position: relative;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: var(--blue);
    .unread-count {
      position: absolute;
      color: var(--white);
      top: 50%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translate(-50%, -50%);
    }
  }
  .avatar {
    position: relative;
    .dot {
      position: absolute;
      top: 0;
      right: 4%;
      height: 10px;
      width: 10px;
      border: 1px solid var(--white);
      border-radius: 50%;
      display: inline-block;
    }
    .dot-active {
      background-color: var(--green);
    }
    .dot-inactive {
      background-color: var(--grey);
    }
  }
  .green-check {
    color: var(--green);
  }
  .pointer {
    cursor: pointer;
  }
`;

const UserCard = ({
  socket,
  user: { handle, name, imageUrl, tagline },
  isFriend,
}) => {
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleInviteSend = () => {
    socket.emit("SEND_INVITE", handle);
    setIsInviteSent(true);
  };

  useEffect(() => {
    Emitter.on("INCREMENT_UNREAD_COUNT", (userHandle) => {
      if (handle === userHandle) setUnreadCount((prevState) => prevState + 1);
    });
    Emitter.on("RESET_UNREAD_COUNT", (userHandle) => {
      if (handle === userHandle) setUnreadCount(0);
    });
    return () => {
      Emitter.off("INCREMENT_UNREAD_COUNT");
      Emitter.off("RESET_UNREAD_COUNT");
    };
  }, []);

  return (
    <Wrapper align="middle" gutter={8}>
      <Col span={5} className="avatar">
        <img src={imageUrl} />
        <span className="dot dot-active"></span>
      </Col>
      <Col span={12}>
        <div className="bold-15 light-black">{name}</div>
        <div className="medium-12 fade tc-1 mt-5">{tagline}</div>
      </Col>
      <Col span={7} align="end">
        {isFriend && unreadCount > 0 ? (
          <span className="medium-12 unread-box">
            <span className="unread-count medium-10">{unreadCount}</span>
          </span>
        ) : isInviteSent ? (
          <Icon icon={checkCircleO} size={12} className="pointer green-check" />
        ) : (
          <Icon
            icon={userPlus}
            size={12}
            onClick={handleInviteSend}
            className="pointer"
          />
        )}
      </Col>
    </Wrapper>
  );
};

UserCard.propTypes = {};

export default UserCard;
