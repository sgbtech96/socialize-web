import React, { useState, useContext } from 'react';
// import PropTypes from "prop-types";
import { Row, Dropdown, Menu, message } from 'antd';
import Icon from 'react-icons-kit';
import { user } from 'react-icons-kit/feather/user';
import { logOut } from 'react-icons-kit/feather/logOut';
import ProfileModal from './ProfileModal';
import { get } from '../../../utils/request';
import { useHistory } from 'react-router-dom';
import { SpinnerContext } from '../../../utils/contexts/SpinnerContext';
import { SocketContext } from '../../../utils/contexts/SocketContext';

const AvatarDropdown = ({ children }) => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const setLoading = useContext(SpinnerContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      const res = await get(`api/v1/auth/logout`);
      setLoading(false);
      if (res.type === 'success') {
        localStorage.removeItem('jwt');
        socket.disconnect();
        history.push(`/onboarding/login`);
      } else {
        console.log('Error -> AvatarDropDown');
      }
    } catch (e) {
      console.log('Error -> AvatarDropDown', e);
      message.error('Something went wrong!');
    }
  };
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
          <div className="normal-15" onClick={handleLogoutClick}>
            Logout
          </div>
        </Row>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {isModalVisible && (
        <ProfileModal
          me
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

export default AvatarDropdown;
