import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Row, Col, message } from "antd";
import { Wrapper } from "./style";
import Icon from "react-icons-kit";
import { userPlus } from "react-icons-kit/feather/userPlus";
import { checkCircleO } from "react-icons-kit/fa/checkCircleO";
import Emitter from "../../utils/emitter";
import { get } from "../../utils/request";

const UserCard = ({
  socket,
  user: { handle, name, imageUrl, tagline },
  isFriend,
}) => {
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [active, setActive] = useState(false);

  const handleInviteSend = () => {
    socket.emit("SEND_INVITE", handle);
    setIsInviteSent(true);
    message.success("Invite sent");
  };

  const fetchActiveStatus = async () => {
    try {
      const res = await get(`/api/v1/chats/isOnline/${handle}`);
      if (res.type === "success") {
        if (res.data.online) setActive(true);
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (!handle) return;
    fetchActiveStatus();
  }, [handle]);

  useEffect(() => {
    socket.on("USER_CAME_ONLINE", (userHandle) => {
      if (userHandle === handle) setActive(true);
    });
    socket.on("USER_WENT_OFFLINE", (userHandle) => {
      if (userHandle === handle) setActive(false);
    });
    return () => {
      socket.off("USER_CAME_ONLINE");
      socket.off("USER_WENT_OFFLINE");
    };
  }, []);

  useEffect(() => {
    // Listening to unread message count
    Emitter.on("INCREMENT_UNREAD_COUNT", (userHandle) => {
      if (handle === userHandle) setUnreadCount((prevState) => prevState + 1);
    });
    // Listening to on-click on UserCard on friends list
    Emitter.on("RESET_UNREAD_COUNT", (userHandle) => {
      if (handle === userHandle) setUnreadCount(0);
    });
    return () => {
      Emitter.off("INCREMENT_UNREAD_COUNT");
      Emitter.off("RESET_UNREAD_COUNT");
    };
  }, []);

  return (
    <Wrapper align="middle" gutter={8} active={active}>
      <Col span={5} className="avatar">
        <img src={imageUrl} />
        <span className="dot"></span>
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
          <Icon icon={checkCircleO} size={12} className="green-check" />
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
