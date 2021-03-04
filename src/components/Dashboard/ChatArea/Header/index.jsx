/* eslint-disable */
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Row, message } from "antd";
import AvatarDropdown from "./AvatarDropdown";
import Emitter from "../../../../utils/emitter";
import NotificationList from "./NotificationList";
import ProfileModal from "./ProfileModal";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { ic_keyboard_arrow_left } from "react-icons-kit/md/ic_keyboard_arrow_left";
import { connect } from "react-redux";
import {
  fetchMyProfile,
  resetActiveFriendProfile,
} from "../../../../actions/dashboard";
import { setActiveSection } from "../../../../actions/display";

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
`;

const Header = ({
  myProfile,
  activeFriend,
  fetchMyProfile,
  setActiveSection,
  mobileWeb,
  resetActiveFriendProfile,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    fetchMyProfile();
  }, []);

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
        <Row className="mr-auto" align="middle">
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
                onClick={() => setIsModalVisible(true)}
              >
                <img
                  src={activeFriend.imageUrl}
                  alt="avatar"
                  height={48}
                  width={48}
                />
              </div>
              <div>
                <div className="active-user-name medium-18">{activeFriend.name}</div>
                <span
                  className={`mt-5 chip bold-12 ${
                    activeFriend.isActive ? "active" : "offline"
                  }`}
                >
                  {activeFriend.isActive ? "Active" : "Offline"}
                </span>
              </div>
            </>
          )}
        </Row>
        <div className="mr-40">
          <NotificationList />
        </div>
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
