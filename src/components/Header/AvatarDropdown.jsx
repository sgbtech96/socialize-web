import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Dropdown, Menu } from "antd";
import Icon from "react-icons-kit";
import { user } from "react-icons-kit/feather/user";
import { logOut } from "react-icons-kit/feather/logOut";
import ProfileModal from "../ProfileModal";

const AvatarDropdown = ({ user: userProfile, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item onClick={() => setIsModalVisible(true)}>
        <Row>
          <div className="mr-5">
            <Icon icon={user} size={16} />
          </div>
          <div className="normal-15">My Profile</div>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Row>
          <div className="mr-5">
            <Icon icon={logOut} size={16} />
          </div>
          <div className="normal-15">Logout</div>
        </Row>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {isModalVisible && (
        <ProfileModal
          me
          user={userProfile}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        {children}
      </Dropdown>
    </>
  );
};

AvatarDropdown.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};

export default AvatarDropdown;
