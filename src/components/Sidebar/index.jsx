import React, { useState } from "react";
// import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { grid } from "react-icons-kit/feather/grid";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import styled from "styled-components";
import { Row, Col } from "antd";
import TrendingSwipe from "../TrendingSwipe";
import SearchBar from "../SearchBar";
import SwitchButton from "../SwitchButton";
import UserCard from "../UserCard";

let samples = [1, 2, 3, 4, 5, 6, 7];
const Wrapper = styled(Col)`
  background-color: var(--white);
  padding: 40px;
  @media screen and (max-width: 400px) {
    padding: 20px 10px;
  }
  .light-black {
    color: var(--black-85);
  }
  .fade {
    color: var(--black-45);
  }
  .pointer {
    cursor: pointer;
  }
  .grid-icon {
    padding: 6px 8px;
    background-color: var(--grey);
    border-radius: 200px;
  }
`;
const Sidebar = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <Wrapper>
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
        <Col span={8}>
          <SwitchButton type="active" text="Direct" />
        </Col>
        <Col span={8}>
          <SwitchButton type="inactive" text="Invite" />
        </Col>
      </Row>

      <Col className="mt-20">
        {samples.map((idx) => (
          <div key={idx}>
            <UserCard />
          </div>
        ))}
      </Col>
    </Wrapper>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
