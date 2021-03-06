import React, { useState } from 'react';
// import PropTypes from "prop-types";
import { Wrapper } from './style';
import { Row, Col } from 'antd';
import TrendingSwipe from './TrendingSwipe';
import SwitchButton from './SwitchButton';
import UserList from './UsersList';
import Header from '../Header';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <>
      <Header type="sidebar" />
      <Wrapper>
        <div className="extra-bold-24 light-black mr-auto">Trending</div>
        <div className="medium-18 fade">Connect with hustling people</div>
        <div className="mt-5">
          <TrendingSwipe />
        </div>
        <div className="mt-10 extra-bold-24 light-black">Chat</div>
        <div className="medium-18 fade">Start a new conversation</div>
        <Row className="mt-10" justify="center">
          <Col span={8} onClick={() => setActiveTab(1)}>
            <SwitchButton
              type={activeTab === 1 ? 'active' : 'inactive'}
              text="Direct"
              cta="user"
            />
          </Col>
          <Col offset={1} span={8} onClick={() => setActiveTab(2)}>
            <SwitchButton
              type={activeTab === 2 ? 'active' : 'inactive'}
              text="Invite"
              cta="userPlus"
            />
          </Col>
        </Row>
        <Col className={`mt-5 ${activeTab === 2 ? 'hide' : ''}`} span={24}>
          <UserList friends />
        </Col>
        <Col className={`mt-5 ${activeTab === 1 ? 'hide' : ''}`} span={24}>
          <UserList />
        </Col>
      </Wrapper>
    </>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
