import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Wrapper } from "./style";
import { Row, Col } from "antd";
import TrendingSwipe from "./TrendingSwipe";
import SwitchButton from "./SwitchButton";
import UserList from "./UsersList";
import Header from "./Header";

const Sidebar = ({ activeChannelId, setActiveUser }) => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <>
      <Header />
      <Wrapper>
        <div className="extra-bold-24 light-black mr-auto">Trending</div>
        <div className="medium-18 fade">Connect with hustling people</div>
        <div className="mt-20">
          <TrendingSwipe />
        </div>
        <div className="mt-20 extra-bold-24 light-black">Chat</div>
        <div className="medium-18 fade">Start a new conversation</div>
        <Row className="mt-20" justify="center" gutter={12}>
          <Col span={8} onClick={() => setActiveTab(1)}>
            <SwitchButton
              type={activeTab === 1 ? "active" : "inactive"}
              text="Direct"
              cta="user"
            />
          </Col>
          <Col span={8} onClick={() => setActiveTab(2)}>
            <SwitchButton
              type={activeTab === 2 ? "active" : "inactive"}
              text="Invite"
              cta="userPlus"
            />
          </Col>
        </Row>
        <Col className={`mt-20 ${activeTab === 2 ? "hide" : ""}`} span={24}>
          <UserList
            friends
            activeChannelId={activeChannelId}
            setActiveUser={setActiveUser}
          />
        </Col>
        <Col className={`mt-20 ${activeTab === 1 ? "hide" : ""}`} span={24}>
          <UserList activeChannelId={activeChannelId} />
        </Col>
      </Wrapper>
    </>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
