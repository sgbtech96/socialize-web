import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Button, Col } from "antd";

const ProfileModal = ({
  me,
  user: { handle, name, imageUrl, tagline },
  isModalVisible,
  setIsModalVisible,
}) => {
  const [disabled, setDisabled] = useState(true);
  const onSave = () => {};
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      className="profile-modal"
    >
      <Col span={24} align="middle">
        <img src={imageUrl} alt="user-avatar" height={150} width={140} />
        <div className="extra-bold-24 mt-10">{handle}</div>
      </Col>
      <Form onFinish={onSave} initialValues={(name, tagline)}>
        <Form.Item
          className="mt-40"
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is a required field!",
            },
          ]}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item name="tagline" label="Tagline">
          <Input.TextArea disabled={disabled} />
        </Form.Item>
        {!disabled && (
          <Form.Item>
            <Button type="primary" htmlType="submit" className="medium-18" >
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
      {me && disabled && (
        <Button type="primary" onClick={() => setDisabled(false)} className="medium-18">
          Edit
        </Button>
      )}
    </Modal>
  );
};

ProfileModal.propTypes = {
  me: PropTypes.bool,
  user: {
    handle: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    tagline: PropTypes.string,
  },
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
};

export default ProfileModal;
