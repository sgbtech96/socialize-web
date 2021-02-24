import React, { useState } from "react";
// import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { grid } from "react-icons-kit/feather/grid";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { Wrapper } from "./style";
import { Row, Col } from "antd";
import Header from "../Header";
import TrendingSwipe from "../TrendingSwipe";
import SearchBar from "../SearchBar";
import SwitchButton from "../SwitchButton";
import UserList from "../UsersList";

const Sidebar = ({ socket, setActiveChannelId }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState(2);

  return (
    <Wrapper>
      <Header />
      <Row align="middle" gutter={4}>
        <Col span={20}>
          <div className="extra-bold-24 light-black">Trending</div>
          <div className="medium-18 fade">Connect with hustling people</div>
        </Col>
        <Col span={4} align="end">
          <Icon icon={grid} size={20} className="grid-icon pointer" />
        </Col>
      </Row>
      <Col className="mt-20" span={24}>
        <TrendingSwipe />
      </Col>
      {showSearch ? (
        <Col className="mt-20" span={24}>
          <SearchBar setShowSearch={setShowSearch} />
        </Col>
      ) : (
        <Row align="middle" gutter={4} className="mt-20">
          <Col span={20}>
            <div className="extra-bold-24 light-black">Chat</div>
            <div className="medium-18 fade">Start a new conversation</div>
          </Col>
          <Col span={4} align="end">
            <Icon
              icon={iosSearchStrong}
              size={20}
              className="grid-icon pointer"
              onClick={() => setShowSearch(true)}
            />
          </Col>
        </Row>
      )}
      <Row className="mt-20" justify="center" gutter={12}>
        <Col span={8} onClick={() => setActiveTab(1)}>
          <SwitchButton type="active" text="Direct" />
        </Col>
        <Col span={8} onClick={() => setActiveTab(2)}>
          <SwitchButton type="inactive" text="Invite" />
        </Col>
      </Row>
      <Col className={`mt-20 ${activeTab === 2 ? "hide" : ""}`} span={24}>
        <UserList socket={socket} friends setActiveChannelId={setActiveChannelId} />
      </Col>
      <Col className={`mt-20 ${activeTab === 1 ? "hide" : ""}`} span={24}>
        <UserList socket={socket} setActiveChannelId={setActiveChannelId} />
      </Col>
    </Wrapper>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
