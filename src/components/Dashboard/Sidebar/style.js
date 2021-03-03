import styled from "styled-components";
import { Col } from "antd";
export const Wrapper = styled(Col)`
  background-color: var(--white);
  height: calc(100vh - 24px - 84px);
  padding: 12px 24px;
  @media screen and (max-width: 400px) {
    padding: 4px 8px;
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
