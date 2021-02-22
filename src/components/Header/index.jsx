import React from "react";
import PropTypes from "prop-types";
import { Divider } from "antd";
import { Wrapper } from "./style";
import AvatarDropdown from "./AvatarDropdown";

const Header = ({ user }) => {
  return (
    <Wrapper align="middle">
      <div className="mr-20">
        <img src="/logo.png" height={42} width={42} />
      </div>
      <div className="bold-18 mr-auto user-name">Hi, {user.name}!</div>
      <div>
        <AvatarDropdown user={user}>
          <img src={user.imageUrl} height={44} width={44} className="user-avatar" />
        </AvatarDropdown>
      </div>
      <Divider />
    </Wrapper>
  );
};

Header.defaultProps = {
  user: { name: "John Doe", imageUrl: "/avatar-placeholder.webp" },
};

Header.propTypes = {
  user: {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  },
};

export default Header;
