import React, { useEffect, useState, useContext } from "react";
// import PropTypes from "prop-types";
import { Row, Col, message } from "antd";
import { Wrapper } from "./style";
import Icon from "react-icons-kit";
import { userPlus } from "react-icons-kit/feather/userPlus";
import { checkCircleO } from "react-icons-kit/fa/checkCircleO";
import Emitter from "../../../../../utils/emitter";
import { get } from "../../../../../utils/request";
import { SocketContext } from "../../../../../utils/contexts/SocketContext";
import { ActiveChannelIdContext } from "../../../../../utils/contexts/ActiveChannelIdContext";

const UserCard = ({ user, isFriend, activeChannelId, setActiveUser }) => {
  const socket = useContext(SocketContext);
  const { handle, name, imageUrl, tagline, channelId } = user;
  const { setActiveChannelId } = useContext(ActiveChannelIdContext);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [active, setActive] = useState(false);

  const handleInviteSend = () => {
    socket.emit("SEND_INVITE", handle);
    setIsInviteSent(true);
    message.success(`Invite sent to ${handle}`);
  };

  const fetchActiveStatus = async () => {
    try {
      const res = await get(`api/v1/chats/isOnline/${handle}`);
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

    return () => {
      Emitter.off("INCREMENT_UNREAD_COUNT");
    };
  }, []);

  return (
    <Wrapper
      align="middle"
      active={active}
      selected={channelId === activeChannelId}
      className={`${isFriend ? "pointer" : ""}`}
      onClick={() => {
        if (isFriend) {
          setActiveChannelId(channelId);
          setActiveUser({ ...user, isActive: active });
        }
        setUnreadCount(0);
      }}
    >
      <Col span={5} className="avatar">
        <img src={imageUrl} />
        <span className="dot"></span>
      </Col>
      <Col offset={1} span={11}>
        <div className="bold-15 light-black">{name}</div>
        <div className="medium-12 fade tc-1 mt-5">{tagline}</div>
      </Col>
      <Col span={7} align="end">
        {isFriend && unreadCount > 0 && (
          <span className="medium-12 unread-box">
            <span className="unread-count medium-10">{unreadCount}</span>
          </span>
        )}
        {!isFriend &&
          (isInviteSent ? (
            <Icon icon={checkCircleO} size={24} className="green-check" />
          ) : (
            <Icon
              icon={userPlus}
              size={24}
              onClick={handleInviteSend}
              className="pointer"
            />
          ))}
      </Col>
    </Wrapper>
  );
};

UserCard.propTypes = {};

export default UserCard;
