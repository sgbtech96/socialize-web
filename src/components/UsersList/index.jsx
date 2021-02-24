import React, { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Col } from "antd";
import UserCard from "../UserCard";
import Emitter from "../../utils/emitter";

const UsersList = ({ socket, friends, setActiveChannelId }) => {
  const [users, setUsers] = useState([]);

  // To fetch list of all users who are not friends
  const fetchUnknowns = async () => {
    try {
      const res = await get(`/api/v1/chats/unknowns`);
      if (res.type === "success") setUsers(res.data);
    } catch (e) {
      console.log("Error -> UsersList -> fetchUnknowns", e);
    }
  };

  // To fetch list of friends
  const fetchFriends = async () => {
    try {
      const res = await get(`api/v1/chats/friends`);
      if (res.type === "success") setUsers(res.data);
    } catch (e) {
      console.log("Error -> UsersList -> fetchFriends", e);
    }
  };

  // Runs when user clicks on UserCard from friends list
  const handleUserClick = (user) => {
    if (!friends) return;
    setActiveChannelId(user.channelId);
    Emitter.emit("RESET_UNREAD_COUNT", user.handle);
  };

  // Calls the api based upon friends prop on component mount
  useEffect(() => {
    friends ? fetchFriends() : fetchUnknowns();
  }, []);

  // Adding socket event listeners to friends list only
  useEffect(() => {
    if (!friends) return;

    // Friend request accepted event
    socket.on("INCOMING_ACCEPTANCE", (user) => {
      setUser((prevState) => [...prevState, user]);
    });

    // Incoming message from a friend
    socket.on("INCOMING_MESSAGE", (message) => {
      const senderHandle = message.sender;
      let tmpUsers = users;
      tmpUsers.forEach((user, idx) => {
        if (user.handle === senderHandle) {
          // Popping out the sender card from friends list and inserting at the top of list
          tmpUsers.splice(idx, 1);
          tmpUsers.unshift(user);
        }
      });
      setUsers(tmpUsers);

      // Increment unread count by 1
      Emitter.emit("INCREMENT_UNREAD_COUNT", senderHandle);
    });

    // Un-subscribing from event listeners
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
