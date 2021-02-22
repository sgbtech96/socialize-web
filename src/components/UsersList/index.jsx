import React, { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Col } from "antd";
import UserCard from "../UserCard";
import Emitter from "../../utils/emitter";

const UsersList = ({ socket, friends, setActiveChannelId }) => {
  const [users, setUsers] = useState([]);

  const fetchUnknowns = async () => {
    const res = await get(`/api/v1/chats/unknowns`);
    if (res.type === "success") setUsers(res.data);
  };

  const fetchFriends = async () => {
    const res = await get(`api/v1/chats/friends`);
    if (res.type === "success") setUsers(res.data);
  };

  const handleUserClick = (user) => {
    if (!friends) return;
    setActiveChannelId(user.channelId);
    Emitter.emit("RESET_UNREAD_COUNT", user.handle);
  };

  useEffect(() => {
    friends ? fetchFriends() : fetchUnknowns();
  }, []);

  useEffect(() => {
    if (!friends) return;
    socket.on("INCOMING_ACCEPTANCE", (user) => {
      setUser((prevState) => [...prevState, user]);
    });
    socket.on("INCOMING_MESSAGE", (message) => {
      const senderHandle = message.sender;
      let tmpUsers = users;
      tmpUsers.forEach((user, idx) => {
        if (user.handle === senderHandle) {
          tmpUsers.splice(idx, 1);
          tmpUsers.unshift(user);
        }
      });
      Emitter.emit("INCREMENT_UNREAD_COUNT", senderHandle);
    });
    return () => {
      socket.off("INCOMING_ACCEPTANCE");
      socket.off("INCOMING_MESSAGE");
    };
  }, []);

  return (
    <Col className="mt-20 invisible-scroll" span={24}>
      {users.map((user, idx) => (
        <div key={idx} onClick={() => handleUserClick(user)}>
          <UserCard socket={socket} user={user} isFriend={friends} />
        </div>
      ))}
    </Col>
  );
};

export default UsersList;
