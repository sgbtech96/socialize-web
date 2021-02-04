import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Col, Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Wrapper = styled(Col)`
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 30px 50px;
  .fade {
    color: var(--black-45);
  }
  .ant-input-affix-wrapper {
    color: #9c9c9c;
    background-color: #f5f7fa;
    border-radius: 200px;
    border: none;
    padding: 10px;
    margin-top: 10px;
  }
  .ant-input {
    color: #9c9c9c;
    background-color: #f5f7fa;
  }
  .ant-form-item-has-error .ant-input-affix-wrapper {
    background-color: #f5f7fa;
  }
  .ant-form-item-has-error .ant-input {
    background-color: #f5f7fa;
  }
  .ant-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-blue);
    width: 100%;
    border-radius: 200px;
    padding: 20px;
    margin-top: 20px;
  }
  .link {
    color: var(--primary-blue);
    cursor: pointer;
  }
`;
const LoginCard = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Wrapper align="middle">
      <div className="bold-36">Forny</div>
      <div className="medium-24 mt-20">Login into account</div>
      <div className="normal-18 mt-10 fade">
        Use your credentials to access your account
      </div>
      <Form onFinish={onFinish}>
        <Form.Item
          name="handle"
          rules={[
            {
              required: true,
              message: "Please input your handle!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Handle" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <div className="medium-18">Log in</div>
          </Button>
        </Form.Item>
      </Form>
      <div className="normal-15 mt-20">
        Don&apos;t have an account? <span className="link">Register here</span>
      </div>
    </Wrapper>
  );
};

LoginCard.propTypes = {};

export default LoginCard;
