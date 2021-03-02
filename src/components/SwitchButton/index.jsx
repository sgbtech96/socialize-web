import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { userPlus } from "react-icons-kit/feather/userPlus";
import { user } from "react-icons-kit/fa/user";

const Wrapper = styled.div`
  .ant-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) =>
      props.type === "active" ? "var(--blue)" : "var(--black-85)"};
    background-color: ${(props) =>
      props.type === "active" ? "var(--blue-subtle)" : "var(--grey)"};
    border: none;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
  }
`;

const SwitchButton = ({ type, text, cta }) => {
  return (
    <Wrapper type={type}>
      <Button
        type="primary"
        htmlType="submit"
        icon={<Icon icon={cta === "user" ? user : userPlus} size={18} />}
      >
        <div className={`ml-10 medium-18`}>{text}</div>
      </Button>
    </Wrapper>
  );
};

SwitchButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};

export default SwitchButton;
