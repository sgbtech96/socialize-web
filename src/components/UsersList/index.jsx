import React, { useEffect, useState, useContext } from "react";
import { get } from "../../utils/request";
import { Col } from "antd";
import UserCard from "../UserCard";
import Emitter from "../../utils/emitter";
import { SocketContext } from "../../utils/SocketContext";
import styled from "styled-components";
import { decodeJWT } from "../../utils/decodeJWT";

const Wrapper = styled(Col)`
  height: 460px;
  overflow-y: scroll;
`;
const UsersList = ({ friends }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);

  // To fetch list of all users who are not friends
  const fetchUsers = async () => {
    try {
      const res = await get(`api/v1/chats/${friends ? "friends" : "unknowns"}`);
      if (res.type === "success") setUsers(res.data);
    } catch (e) {
      console.log("Error -> UsersList -> fetchUsers", e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Adding socket event listeners to friends list only
  useEffect(() => {
    if (!friends) return;
    // Incoming message from a friend
    socket.on("INCOMING_MESSAGE", (message) => {
      const { senderHandle } = message;
      if (decodeJWT().handle === senderHandle) return;
      let senderInfo = null;
      let tmpUsers = users.filter((user) => {
        if (user.handle === senderHandle) senderInfo = user;
        else return user;
      });
      if (senderInfo) tmpUsers.unshift(senderInfo);
      setUsers(tmpUsers);

      // Increment unread count by 1
      Emitter.emit("INCREMENT_UNREAD_COUNT", senderHandle);
    });

    socket.on("REQUEST_ACCEPTED", ({ user }) => {
      setUsers((prevState) => [...prevState, user]);
    });

    // Un-subscribing from event listeners
    return () => {
      socket.off("INCOMING_MESSAGE");
      socket.off("REQUEST_ACCEPTED");
    };
  }, []);

  return (
    <Wrapper className="mt-20 invisible-scroll" span={24}>
      {users.map((user) => (
        <div key={user.handle}>
          <UserCard user={user} isFriend={friends} />
        </div>
      ))}
    </Wrapper>
  );
};

export default UsersList;
