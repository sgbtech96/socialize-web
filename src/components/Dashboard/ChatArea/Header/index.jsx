/* eslint-disable */
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Row, message } from "antd";
import AvatarDropdown from "./AvatarDropdown";
import { get } from "../../../../utils/request";
import Emitter from "../../../../utils/emitter";
import NotificationList from "./NotificationList";
import ProfileModal from "./ProfileModal";
import styled from "styled-components";

const Wrapper = styled(Row)`
  background-color: var(--white);
  height: 84px;
  padding: 0 24px;
  .user-avatar {
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid var(--blue);
  }
  .active-user-avatar {
    cursor: pointer;
    border-radius: 8px;
  }
  .active-user-name {
    color: var(--black-85);
    letter-spacing: 0.2px;
  }
  .chip {
    display: inline-block;
    border-radius: 8px;
    text-transform: uppercase;
    padding: 4px 8px;
  }
  .active {
    color: #fff;
    background-color: var(--green);
  }
  .offline {
    color: var(--black-85);
    background-color: var(--grey-subtle);
  }
`;

const Header = ({ activeUser }) => {
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <>
      {isModalVisible && (
        <ProfileModal
          user={activeUser}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      <Wrapper align="middle">
        <Row className="mr-auto" align="middle">
          {activeUser && (
            <>
              <div
                className="active-user-avatar mr-10"
                onClick={() => setIsModalVisible(true)}
              >
                <img
                  src={activeUser?.imageUrl}
                  alt="avatar"
                  height={48}
                  width={48}
                />
              </div>
              <div>
                <div className="active-user-name medium-18">{activeUser?.name}</div>
                <span
                  className={`mt-5 chip bold-12 ${
                    activeUser?.isActive ? "active" : "offline"
                  }`}
                >
                  {activeUser?.isActive ? "Active" : "Offline"}
                </span>
              </div>
            </>
          )}
        </Row>
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
    </>
  );
};

export default Header;
