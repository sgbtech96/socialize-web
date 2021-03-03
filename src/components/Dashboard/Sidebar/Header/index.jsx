import React from "react";
import styled from "styled-components";
import { Row } from "antd";

const Wrapper = styled(Row)`
  background-color: var(--white);
  height: 84px;
  padding: 0 24px;
  .light-black {
    color: var(--black-85);
  }
`;

const Header = () => {
  return (
    <Wrapper align="middle">
      <div className="mr-20">
        <img src="/logo.png" height={42} width={42} />
      </div>
      <div className="bold-18">shhh!</div>
    </Wrapper>
  );
};

export default Header;
