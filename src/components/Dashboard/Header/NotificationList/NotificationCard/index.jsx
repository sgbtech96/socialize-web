import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Row, Col, message } from 'antd';
import { Icon } from 'react-icons-kit';
import { checkCircle } from 'react-icons-kit/feather/checkCircle';
import { SocketContext } from '../../../../../utils/contexts/SocketContext';

const Wrapper = styled(Row)`
  .user-avatar {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }
  .accept-btn {
    .check-icon {
      color: ${(props) => (props.accepted ? 'var(--green)' : 'var(--blue)')};
    }
  }
`;

const NotificationCard = ({ user, type }) => {
  const socket = useContext(SocketContext);
  const [accepted, setAccepted] = useState(false);
  const handleInviteAccept = () => {
    socket.emit('ACCEPT_INVITE', user.handle);
    setAccepted(true);
    message.success(
      `Congratulations! We are adding @${user.handle} to your network`
    );
  };
  return (
    <Wrapper wrap={false} accepted={accepted} align="middle">
      <Col flex="68px">
        <img
          src={user.imageUrl || '/avatar-placeholder.webp'}
          alt="avatar"
          className="user-avatar"
        />
      </Col>
      <Col flex="auto">
        <div className="medium-15">
          @{user.handle}{' '}
          {type === 'invite'
            ? 'sent you a connection request'
            : 'accepted your invitation'}
        </div>
        {type === 'invite' && (
          <Col
            className="accept-btn mt-5"
            align="end"
            onClick={() => {
              if (accepted) {
                return;
              }
              handleInviteAccept();
            }}>
            <Icon icon={checkCircle} size={24} className="check-icon" />
          </Col>
        )}
      </Col>
    </Wrapper>
  );
};

export default NotificationCard;
