import React from "react";
// import PropTypes from "prop-types";
import { Input } from "antd";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { iosCloseEmpty } from "react-icons-kit/ionicons/iosCloseEmpty";

const Wrapper = styled.div`
  .ant-input-affix-wrapper-lg {
    padding: 12px;
    border-radius: 10px;
  }
  .pointer {
    cursor: pointer;
  }
`;
const SearchBar = ({ setShowSearch }) => {
  return (
    <Wrapper>
      <Input
        size="large"
        placeholder="Search friends"
        prefix={<Icon icon={iosSearchStrong} size={18} className="mr-20 pointer" />}
        suffix={
          <Icon
            icon={iosCloseEmpty}
            size={24}
            className="pointer"
            onClick={() => setShowSearch(false)}
          />
        }
      />
    </Wrapper>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
