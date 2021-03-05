import React, { useEffect, useState, useContext } from "react";
import { get } from "../../../../utils/request";
import { Col } from "antd";
import UserCard from "./UserCard";
import Emitter from "../../../../utils/emitter";
import { SocketContext } from "../../../../utils/contexts/SocketContext";
import styled from "styled-components";
import { decodeJWT } from "../../../../utils/decodeJWT";
import { connect } from "react-redux";

const Wrapper = styled(Col)`
  overflow-y: scroll;
`;
const UsersList = ({ friends, activeChannelId }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);

  // To fetch list of all users who are not friends
  const fetchUsers = async () => {
    try {
      const res = await get(`api/v1/chats/${friends ? "friends" : "unknowns"}`);
      if (res.type === "success") {
        setUsers(res.data);
        if (friends) {
          res.data.forEach((friend) =>
            socket.emit("JOIN_CHANNEL", friend.channelId)
          );
        }
      }
    } catch (e) {
      console.log("Error -> UsersList -> fetchUsers", e);
    }
  };

  const handleIncomingMessage = (message) => {
    const { senderHandle } = message;
    if (decodeJWT().handle === senderHandle) return;
    let senderInfo = null;
    let tmpUsers = [];
    users.forEach((user) => {
      if (user.handle === senderHandle) {
        senderInfo = user;
      } else tmpUsers.push(user);
    });
    if (senderInfo) setUsers([senderInfo, ...tmpUsers]);

    // Increment unread count by 1
    // console.log(users, senderInfo?.channelId, activeChannelId);
    if (senderInfo?.channelId !== activeChannelId)
      Emitter.emit("INCREMENT_UNREAD_COUNT", senderHandle);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Adding socket event listeners to friends list only
  useEffect(() => {
    if (!friends) return;
    // Incoming message from a friend
    socket.on("INCOMING_MESSAGE", ({ message, channelId }) => {
      handleIncomingMessage(message);
      Emitter.emit("INCOMING_MESSAGE", { message, channelId });
    });

    socket.on("REQUEST_ACCEPTED", ({ user, acceptedBy }) => {
      setUsers((prevState) => [...prevState, user]);
      socket.emit("JOIN_CHANNEL", user.channelId);
      Emitter.emit("REQUEST_ACCEPTED", { user, acceptedBy });
    });

    // Un-subscribing from event listeners
    return () => {
      socket.off("INCOMING_MESSAGE");
      socket.off("REQUEST_ACCEPTED");
    };
  }, [users, activeChannelId]);

  return (
    <Wrapper className="mt-20 invisible-scroll" span={24}>
      {users?.map((user) => (
        <div key={user.handle}>
          <UserCard user={user} isFriend={friends} />
        </div>
      ))}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    activeChannelId: state.dashboard.activeFriendProfile.data?.channelId,
  };
};

export default connect(mapStateToProps, null)(UsersList);
