import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Wrapper } from "../LoginCard/style";

const AuthCard = ({ type }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Wrapper align="middle">
      <div className="bold-36">Forny</div>
      <div className="mt-30">
        <img src="/auth-icon.png" height={75} />
      </div>
      <div className="medium-24 mt-20">Two-Step Verification</div>
      {type === "send" ? (
        <div className="mt-10 normal-18 fade">We need to verify your email</div>
      ) : (
        <>
          <div className="mt-10 normal-18 fade">
            We’ve sent a verification code to
          </div>
          <div className="mt-5 normal-18 fade">+2*******337</div>
          <div className="mt-20 medium-18">Enter OTP code here:</div>
        </>
      )}
      <Form onFinish={onFinish}>
        {type === "send" ? (
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Email address"
            />
          </Form.Item>
        ) : (
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "OTP is required",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Verification code"
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <div className="medium-18">
              {type === "send" ? "Send verification code" : "Verify"}
            </div>
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

AuthCard.propTypes = {
  type: PropTypes.string,
};

export default AuthCard;
