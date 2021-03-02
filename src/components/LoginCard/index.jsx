import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Wrapper } from "./style";
import { useHistory } from "react-router-dom";
import { post } from "../../utils/request";
import { SpinnerContext } from "../../utils/SpinnerContext";

const LoginCard = ({ type }) => {
  const history = useHistory();
  const setLoading = useContext(SpinnerContext);
  const [log, setLog] = useState(null); // Will contain backend validation error

  const postForm = async (values) => {
    setLoading(true);
    try {
      const res = await post(
        `api/v1/${type === "login" ? "auth/login" : "onboarding/register"}`,
        values
      );
      setLoading(false);
      if (res.type === "success") {
        if (type === "login") {
          localStorage.setItem("jwt", res.data.token);
          history.push("/dashboard");
        } else {
          message.success("Successfully registered!");
          sessionStorage.removeItem("onboarding-email");
          setTimeout(() => history.push("login"), 2000);
        }
      } else if (res.type === "log") {
        setLog(res.message);
      } else {
        console.log(`Error -> LoginCard -> ${res.error}`);
        message.error("Something went wrong!");
      }
    } catch (e) {
      console.log(`Error -> LoginCard -> ${e}`);
      message.error("Something went wrong!");
    }
  };

  const onFinish = (values) => {
    postForm(values);
  };

  // For "register" redirect to /send-otp if no otp sent
  useEffect(() => {
    if (type === "register" && !sessionStorage.getItem("onboarding-email"))
      history.push("send-otp");
  }, []);

  return (
    <>
      <Wrapper align="middle">
        <div>
          <img src="/logo.png" height={80} width={80} />
        </div>
        <div className="medium-24 mt-20">
          {type === "login" ? "Login into account" : "Setup your account"}
        </div>
        <div className="normal-18 mt-10 fade">
          {type === "login"
            ? "Use your credentials to access your account"
            : "Generate credentials for yourself"}
        </div>
        <Form
          onFinish={onFinish}
          initialValues={
            type === "register"
              ? { email: sessionStorage.getItem("onboarding-email") }
              : {}
          }
        >
          {type === "register" && (
            <>
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
                  disabled
                  placeholder="Email address"
                />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="text"
                  placeholder="First Name"
                />
              </Form.Item>
            </>
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
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
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
          <span
            className="link"
            onClick={() => {
              if (type === "login") history.push("send-otp");
              else history.push("login");
            }}
          >
            {type === "login" ? "Register here" : "Login"}
          </span>
        </div>
        {log && <div className="normal-15 mt-20 error">{log}</div>}
      </Wrapper>
    </>
  );
};

LoginCard.propTypes = {
  type: PropTypes.string,
};

LoginCard.defaultProps = {
  type: "login",
};

export default LoginCard;
