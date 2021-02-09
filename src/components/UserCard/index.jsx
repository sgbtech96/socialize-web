import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Col } from "antd";

const Wrapper = styled(Row)`
  cursor: pointer;
  padding: 10px 20px;
  max-width: 370px;
  border-bottom: 1px solid var(--grey);
  :hover {
    background-color: var(--blue-subtle);
    border-left: 4px solid var(--blue);
    padding-left: 16px;
  }
  .light-black {
    color: var(--black-65);
  }
  .fade {
    color: var(--black-45);
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }
  .unread-box {
    display: inline-block;
    position: relative;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: var(--blue);
    .unread-count {
      position: absolute;
      color: var(--white);
      top: 50%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translate(-50%, -50%);
    }
  }
  .avatar {
    position: relative;
    .dot {
      position: absolute;
      top: 0;
      right: 4%;
      height: 10px;
      width: 10px;
      border: 1px solid var(--white);
      border-radius: 50%;
      display: inline-block;
    }
    .dot-active {
      background-color: var(--green);
    }
    .dot-inactive {
      background-color: var(--grey);
    }
  }
`;

const UserCard = () => {
  return (
    <Wrapper align="middle" gutter={8}>
      <Col span={5} className="avatar">
        <img src="/user-avatar.jpg" />
        <span className="dot dot-active"></span>
      </Col>
      <Col span={12}>
        <div className="bold-15 light-black">Jony Lynetin</div>
        <div className="medium-12 fade tc-1 mt-5">I need job, please help me..</div>
      </Col>
      <Col span={7} align="end">
        <div className="medium-12 fade mb-10">30/11/19</div>
        <span className="medium-12 unread-box">
          <span className="unread-count medium-10">2</span>
        </span>
      </Col>
    </Wrapper>
  );
};

UserCard.propTypes = {};

export default UserCard;
