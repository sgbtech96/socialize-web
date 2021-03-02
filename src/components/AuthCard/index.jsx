import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Wrapper } from "../LoginCard/style";
import { useHistory } from "react-router-dom";
import { post } from "../../utils/request";
import { SpinnerContext } from "../../utils/SpinnerContext";

// Defining a new func for string prototype
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) + replacement + this.substr(index + replacement.length)
  );
};

// Hiding some chars of the email
const generateEncryptedEmail = (email) => {
  const len = email?.length;
  let i = 0;
  while (i < len) {
    email = email.replaceAt(i, "*");
    i += 1;
    if (i > 4) break;
  }
  return email;
};

const AuthCard = ({ type }) => {
  const history = useHistory();
  const setLoading = useContext(SpinnerContext);
  const [log, setLog] = useState(null); // Will contain backend validation error

  // Make a call to onboarding APIs
  const postForm = async (values) => {
    setLoading(true);
    const payload =
      type === "send"
        ? values
        : { email: sessionStorage.getItem("onboarding-email"), otp: values.otp };
    try {
      const res = await post(`api/v1/onboarding/${type}Otp`, payload);
      setLoading(false);
      if (res.type === "success") {
        if (type === "send") history.push("verify-otp");
        else history.push("register");
      } else if (res.type === "log") setLog(res.message);
      else {
        console.log(`Error -> AuthCard -> ${res.error}`);
        message.error("Something went wrong!");
      }
    } catch (e) {
      console.log(`Error -> AuthCard -> ${e}`);
      message.error("Something went wrong!");
    }
  };

  // Runs when form is submitted
  const onFinish = (values) => {
    if (type === "send") {
      sessionStorage.setItem("onboarding-email", values.email); // Will be stored in "send: and utilized in "verify"
    }
    postForm(values);
  };

  // Redirect to /send-otp if no otp was sent
  useEffect(() => {
    if (type === "verify") {
      if (!sessionStorage.getItem("onboarding-email")) history.push("send-otp");
    }
  }, []);

  return (
    <Wrapper align="middle">
      <div className="bold-36">shhh!</div>
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
          <div className="mt-5 normal-18 fade">
            {generateEncryptedEmail(sessionStorage.getItem("onboarding-email"))}
          </div>
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
      <div className="normal-15 mt-20">
        Already have an account?{" "}
        <span
          className="link"
          onClick={() => {
            history.push("login");
          }}
        >
          Login
        </span>
      </div>
      {log && <div className="normal-15 mt-20 error">{log}</div>}
    </Wrapper>
  );
};

AuthCard.propTypes = {
  type: PropTypes.string,
};

AuthCard.defaultProps = {
  type: "send",
};

export default AuthCard;
