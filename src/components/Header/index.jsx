/* eslint-disable */
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { message } from "antd";
import { Wrapper } from "./style";
import AvatarDropdown from "./AvatarDropdown";
import { get } from "../../utils/request";
import Emitter from "../../utils/emitter";
import NotificationList from "../NotificationList";

const Header = () => {
  const [user, setUser] = useState({
    name: "John Doe",
  });

  const fetchUser = async () => {
    try {
      const res = await get(`api/v1/profile/me`);
      if (res.type === "success") setUser(res.data);
      else console.log("Error -> Header", res);
    } catch (e) {
      console.log("Error -> Header", e);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    Emitter.on("PROFILE_EDITED", () => fetchUser());

    return () => {
      Emitter.off("PROFILE_EDITED");
    };
  }, []);

  return (
    <Wrapper align="middle">
      <div className="mr-20">
        <img src="/logo.png" height={42} width={42} />
      </div>
      <div className="bold-18 mr-auto user-name">Hi, {user.name}!</div>
      <div className="mr-40">
        <NotificationList />
      </div>
      <div>
        <AvatarDropdown user={user}>
          <img
            src={user.imageUrl || "/avatar-placeholder.webp"}
            height={44}
            width={44}
            className="user-avatar"
          />
        </AvatarDropdown>
      </div>
    </Wrapper>
  );
};

export default Header;
