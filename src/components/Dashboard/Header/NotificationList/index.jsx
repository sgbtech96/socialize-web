import React, { useState, useEffect, useContext } from 'react';
import { Row, Dropdown, Menu, message } from 'antd';
import Icon from 'react-icons-kit';
import { ic_notifications_active } from 'react-icons-kit/md/ic_notifications_active';
import styled from 'styled-components';
import NotificationCard from './NotificationCard';
import { get } from '../../../../utils/request';
import { SocketContext } from '../../../../utils/contexts/SocketContext';
import { decodeJWT } from '../../../../utils/decodeJWT';
import Emitter from '../../../../utils/emitter';

const Wrapper = styled.div`
  .bell-icon {
    position: relative;
    cursor: pointer;
    .dot {
      position: absolute;
      bottom: 0;
      right: 4%;
      height: 10px;
      width: 10px;
      border: 1px solid var(--white);
      border-radius: 50%;
      display: ${(props) => (props.alert ? 'inline-block' : 'none')};
      background-color: var(--red);
    }
  }
`;

const NotificationList = () => {
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const [alert, setAlert] = useState(false);

  const fetchInvites = async () => {
    try {
      const res = await get(`api/v1/chats/invites`);
      if (res.type === 'success') {
        setNotifications(res.data);
        if (res.data?.length > 0) {
          setAlert(true);
        }
      } else {
        console.log('Error -> NotificationsList');
      }
    } catch (e) {
      console.log('Error -> NotificationsList', e);
      message.error('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  useEffect(() => {
    socket.on('INCOMING_INVITE', (user) => {
      setNotifications((prevState) => [{ user, type: 'invite' }, ...prevState]);
      setAlert(true);
    });
    Emitter.on('REQUEST_ACCEPTED', ({ user, acceptedBy }) => {
      if (acceptedBy === decodeJWT().handle) {
        return;
      }
      setNotifications((prevState) => [{ user, type: 'acceptance' }, ...prevState]);
      setAlert(true);
    });
    return () => {
      socket.off('INCOMING_INVITE');
      Emitter.off('REQUEST_ACCEPTED');
    };
  }, []);

  const menu =
    notifications.length > 0 ? (
      <Menu>
        {notifications.map(({ user, type }) => (
          <Menu.Item key={user.handle}>
            <NotificationCard user={user} type={type} />
          </Menu.Item>
        ))}
      </Menu>
    ) : (
      <Menu>
        <Menu.Item key="1">oops! nothing here</Menu.Item>
      </Menu>
    );
  return (
    <Wrapper alert={alert}>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <div className="bell-icon" onClick={() => setAlert(false)}>
          <Icon icon={ic_notifications_active} size={24} />
          <span className="dot"></span>
        </div>
      </Dropdown>
    </Wrapper>
  );
};

export default NotificationList;
