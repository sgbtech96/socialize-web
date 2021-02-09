import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Wrapper } from "./style";

const LoginCard = ({ type }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Wrapper align="middle">
      <div className="bold-36">Forny</div>
      <div className="medium-24 mt-20">
        {type === "login" ? "Login into account" : "Setup your account"}
      </div>
      <div className="normal-18 mt-10 fade">
        {type === "login"
          ? "Use your credentials to access your account"
          : "Generate credentials for yourself"}
      </div>
      <Form onFinish={onFinish}>
        {type === "register" && (
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
        )}
        <Form.Item
          name="handle"
          rules={[
            {
              required: true,
              message: "Please input a handle!",
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
              message: "Please input a password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        {type === "register" && (
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <div className="medium-18">
              {type === "login" ? "Log in" : "Register"}
            </div>
          </Button>
        </Form.Item>
      </Form>
      <div className="normal-15 mt-20">
        {type === "login" ? `Don't have an account?` : "Already have an account?"}{" "}
        <span className="link">{type === "login" ? "Register here" : "Login"}</span>
      </div>
    </Wrapper>
  );
};

LoginCard.propTypes = {
  type: PropTypes.string,
};

export default LoginCard;
