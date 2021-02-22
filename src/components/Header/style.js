import styled from "styled-components";
import { Row } from "antd";
export const Wrapper = styled(Row)`
  background-color: var(--white);
  .user-avatar {
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid var(--blue);
  }
  .user-name {
    color: var(--black-85);
    letter-spacing: 0.2px;
  }
  .ant-divider-horizontal {
    margin: 20px 0;
  }
`;
