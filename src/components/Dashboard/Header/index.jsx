import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Row, message } from "antd";
import AvatarDropdown from "./AvatarDropdown";
import Emitter from "../../../utils/emitter";
import NotificationList from "./NotificationList";
import ProfileModal from "./ProfileModal";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { ic_keyboard_arrow_left } from "react-icons-kit/md/ic_keyboard_arrow_left";
import { connect } from "react-redux";
import {
  fetchMyProfile,
  resetActiveFriendProfile,
} from "../../../actions/dashboard";
import { setActiveSection } from "../../../actions/display";
import { get } from "../../../utils/request";

const Wrapper = styled(Row)`
  background-color: var(--white);
  height: 84px;
  padding: 0 24px;
  .pointer {
    cursor: pointer;
  }
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
  .bell-icon {
    margin-right: 40px;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 6px;
    position: relative;
    z-index: 10;
    -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    .bell-icon {
      margin-right: 10px;
    }
    .friend-info {
      max-width: 200px;
    }
  }
`;

const Header = ({
  type,
  myProfile,
  activeFriend,
  fetchMyProfile,
  setActiveSection,
  mobileWeb,
  resetActiveFriendProfile,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState(false);

  const fetchActiveStatus = async () => {
    // console.log(activeFriend.handle);
    try {
      const res = await get(`api/v1/chats/isOnline/${activeFriend?.handle}`);
      if (res.type === "success") {
        if (res.data.online) {
          setActive(true);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!activeFriend) {
      return;
    }
    Emitter.on("USER_CAME_ONLINE", (userHandle) => {
      if (userHandle === activeFriend?.handle) {
        setActive(true);
      }
    });
    Emitter.on("USER_WENT_OFFLINE", (userHandle) => {
      if (userHandle === activeFriend?.handle) {
        setActive(false);
      }
    });
    return () => {
      Emitter.off("USER_CAME_ONLINE");
      Emitter.off("USER_WENT_OFFLINE");
    };
  }, [activeFriend]);

  useEffect(() => {
    if (type === "sidebar") {
      fetchMyProfile();
    }
  }, []);

  useEffect(() => {
    if (!activeFriend.handle) {
      return;
    }
    fetchActiveStatus();
  }, [activeFriend]);

  useEffect(() => {
    Emitter.on("PROFILE_EDITED", () => fetchMyProfile());

    return () => {
      Emitter.off("PROFILE_EDITED");
    };
  }, []);

  return (
    <>
      {isModalVisible && (
        <ProfileModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      <Wrapper align="middle">
        {type === "chat-area" ? (
          <Row className="mr-auto friend-info" align="middle">
            {mobileWeb && (
              <Icon
                icon={ic_keyboard_arrow_left}
                size={24}
                className="mr-10 pointer"
                onClick={() => {
                  setActiveSection(1);
                  resetActiveFriendProfile();
                }}
              />
            )}
            {activeFriend.handle && (
              <>
                <div
                  className="active-user-avatar mr-10"
                  onClick={() => setIsModalVisible(true)}>
                  <img
                    src={activeFriend.imageUrl || "/avatar-placeholder.png"}
                    alt="avatar"
                    height={48}
                    width={48}
                  />
                </div>
                <div>
                  <div className="active-user-name medium-18">
                    {activeFriend.name}
                  </div>
                  <span
                    className={`mt-5 chip bold-12 ${active ? "active" : "offline"}`}>
                    {active ? "Active" : "Offline"}
                  </span>
                </div>
              </>
            )}
          </Row>
        ) : (
          <Row className="mr-auto" align="middle">
            <div className="mr-20">
              <img src="/logo.png" height={42} width={42} />
            </div>
            <div className="bold-18">Socialize</div>
          </Row>
        )}
        {((type === "sidebar" && mobileWeb) ||
          (type === "chat-area" && !mobileWeb)) && (
          <div className="bell-icon">
            <NotificationList />
          </div>
        )}
        {((type === "sidebar" && mobileWeb) ||
          (type === "chat-area" && !mobileWeb)) && (
          <div>
            <AvatarDropdown>
              <img
                src={myProfile.imageUrl || "/avatar-placeholder.webp"}
                height={44}
                width={44}
                className="user-avatar"
              />
            </AvatarDropdown>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  const { myProfile, activeFriendProfile } = state.dashboard;
  const { mobileWeb } = state.display;
  return {
    myProfile: myProfile.data,
    activeFriend: activeFriendProfile.data,
    mobileWeb,
  };
};
export default connect(mapStateToProps, {
  fetchMyProfile,
  setActiveSection,
  resetActiveFriendProfile,
})(Header);
