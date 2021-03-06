import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import TextTool from './TextTool';
import { io } from 'socket.io-client';
import { SocketContext } from '../../utils/contexts/SocketContext';
import { SpinnerContext } from '../../utils/contexts/SpinnerContext';
import { connect } from 'react-redux';
import { setMobileWeb } from '../../actions/display';

let socket = null;
const Wrapper = styled(Row)`
  padding: 12px;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
  .hide {
    display: none;
  }
`;
const Dashboard = ({ mobileWeb, activeSection, setMobileWeb }) => {
  const setLoading = useContext(SpinnerContext);
  const getDeviceSize = () => {
    if (window.innerWidth < 768) {
      setMobileWeb(true);
    }
  };

  useEffect(() => {
    getDeviceSize();
  }, []);

  useEffect(() => {
    setLoading(true);
    socket = io(`${process.env.REACT_APP_BACKEND_BASE_URL}`, {
      auth: {
        token: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    socket?.on('connect', () => {
      setLoading(false);
      socket.emit('ONLINE');
    });
    return () => {
      socket?.off('connect');
    };
  }, []);
  return (
    socket && (
      <SocketContext.Provider value={socket}>
        <Wrapper justify="center">
          <Col
            xs={24}
            sm={18}
            md={10}
            lg={8}
            xl={8}
            xxl={6}
            className={mobileWeb && activeSection === 2 ? 'hide' : ''}>
            <Sidebar />
          </Col>
          <Col
            xs={24}
            sm={18}
            md={14}
            lg={16}
            xl={16}
            xxl={18}
            className={mobileWeb && activeSection === 1 ? 'hide' : ''}>
            <ChatArea />
            <TextTool />
          </Col>
        </Wrapper>
      </SocketContext.Provider>
    )
  );
};

const mapStateToProps = (state) => {
  const { mobileWeb, activeSection } = state.display;
  return {
    mobileWeb,
    activeSection,
  };
};
export default connect(mapStateToProps, { setMobileWeb })(Dashboard);
