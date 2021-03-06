import styled from 'styled-components';
import { Row } from 'antd';
export const Wrapper = styled(Row)`
  padding: 10px 20px;
  max-width: 400px;
  border-bottom: 1px solid var(--grey);
  :hover {
    background-color: var(--blue-subtle);
    border-left: 4px solid var(--blue);
    padding-left: 16px;
  }
  ${(props) =>
    props.selected
      ? 'background-color: var(--blue-subtle);border-left: 4px solid var(--blue);padding-left: 16px;'
      : ''}

  .light-black {
    color: var(--black-65);
  }
  .fade {
    color: var(--black-45);
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }
  .unread-box {
    display: inline-block;
    position: relative;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: var(--blue);
    .unread-count {
      font-size: 10px !important;
      position: absolute;
      color: var(--white);
      top: 50%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translate(-50%, -50%);
    }
  }
  .avatar {
    position: relative;
    .dot {
      position: absolute;
      top: 0;
      right: 4%;
      height: 10px;
      width: 10px;
      border: 1px solid var(--white);
      border-radius: 50%;
      display: inline-block;
      background-color: ${(props) =>
        props.active ? 'var(--green)' : 'var(--grey)'};
    }
  }
  .green-check {
    color: var(--green);
  }
  .pointer {
    cursor: pointer;
  }
`;
