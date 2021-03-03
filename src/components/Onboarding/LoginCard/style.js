import styled from "styled-components";
import { Col } from "antd";
export const Wrapper = styled(Col)`
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 30px 50px;
  .fade {
    color: var(--black-45);
  }
  .ant-input-affix-wrapper {
    color: #9c9c9c;
    background-color: #f5f7fa;
    border-radius: 200px;
    border: none;
    padding: 10px;
    margin-top: 10px;
  }
  .ant-input {
    color: #9c9c9c;
    background-color: #f5f7fa;
  }
  .ant-form-item-has-error .ant-input-affix-wrapper {
    background-color: #f5f7fa;
  }
  .ant-form-item-has-error .ant-input {
    background-color: #f5f7fa;
  }
  .ant-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--blue);
    width: 100%;
    border-radius: 200px;
    padding: 20px;
    margin-top: 20px;
  }
  .link {
    color: var(--blue);
    cursor: pointer;
  }
  .error {
    color: var(--red);
  }
  @media screen and (max-width: 400px) {
    padding: 20px;
  }
`;
