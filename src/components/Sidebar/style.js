import styled from "styled-components";
import { Col } from "antd";
export const Wrapper = styled(Col)`
  background-color: var(--white);
  padding: 12px 32px;
  @media screen and (max-width: 400px) {
    padding: 20px;
  }
  .light-black {
    color: var(--black-85);
  }
  .fade {
    color: var(--black-45);
  }
  .pointer {
    cursor: pointer;
  }
  .grid-icon {
    padding: 6px 8px;
    background-color: var(--grey);
    border-radius: 200px;
  }
  .hide {
    display: none;
  }
`;
