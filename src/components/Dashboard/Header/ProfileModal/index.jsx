import React, { useContext, useState } from "react";
// import PropTypes from "prop-types";
import { Modal, Form, Input, Button, Col, message, Progress } from "antd";
import { put } from "../../../../utils/request";
import Emitter from "../../../../utils/emitter";
import { storage } from "../../../../utils/firebase";
import Icon from "react-icons-kit";
import { pencil } from "react-icons-kit/fa/pencil";
import styled from "styled-components";
import { SpinnerContext } from "../../../../utils/contexts/SpinnerContext";
import { connect } from "react-redux";

const Wrapper = styled.div`
  input[type="file"] {
    opacity: 0;
    width: 100%;
  }
  .img-container {
    position: relative;
    .edit-icon {
      position: absolute;
      bottom: 0;
    }
    .hidden-upload {
      position: absolute;
      z-index: 2;
      width: 24px;
      bottom: 0;
    }
  }
  .pointer {
    cursor: pointer;
  }
`;
const ProfileModal = ({
  me,
  user: { handle, name, imageUrl, tagline },
  isModalVisible,
  setIsModalVisible,
}) => {
  const setLoading = useContext(SpinnerContext);
  const [disabled, setDisabled] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState(imageUrl);

  const handleUpload = (image) => {
    if (!image) {
      return;
    }
    setUploading(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("Error while uploading image!");
        setUploading(false);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // console.log("url", url);
            setUserImageUrl(url);
            setUploading(false);
          });
      }
    );
  };
  const onSave = async (values) => {
    if (uploading) {
      message.warning("Please wait! Your image is being uploaded!");
      return;
    }
    setIsModalVisible(false);
    setLoading(true);
    try {
      const res = await put(`api/v1/profile/edit`, {
        ...values,
        imageUrl: userImageUrl,
      });
      setLoading(false);
      if (res.type === "success") {
        setDisabled(true);
        Emitter.emit("PROFILE_EDITED");
      } else {
        console.log("Error -> ProfileModal");
      }
    } catch (e) {
      console.log("Error -> ProfileModal", e);
      message.error("Something went wrong!");
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      className="profile-modal"
    >
      <Wrapper>
        <Col span={24} align="middle">
          <div className="img-container">
            <img
              src={userImageUrl || "/avatar-placeholder.webp"}
              alt="user-avatar"
              height={150}
              width={140}
            />
            {!disabled && (
              <>
                <span className="edit-icon">
                  <Icon icon={pencil} size={24} />
                </span>
                <span className="hidden-upload pointer">
                  <input
                    type="file"
                    onChange={(e) => {
                      // console.log(e.target.files?.[0]);
                      handleUpload(e.target.files?.[0]);
                    }}
                  />
                </span>
              </>
            )}
          </div>
          <div className="extra-bold-24 mt-10">@{handle}</div>
        </Col>
        <Form
          onFinish={onSave}
          initialValues={{
            name,
            tagline,
          }}
        >
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
              <Col span={24} align="middle">
                <Button type="primary" htmlType="submit" className="medium-18">
                  Save
                </Button>
              </Col>
            </Form.Item>
          )}
        </Form>
        {me && disabled && (
          <Col
            span={24}
            align="middle"
            style={{
              marginTop: "44px",
              marginBottom: "24px",
            }}
          >
            <Button
              type="primary"
              onClick={() => setDisabled(false)}
              className="medium-18"
            >
              Edit
            </Button>
          </Col>
        )}
      </Wrapper>
    </Modal>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { myProfile, activeFriendProfile } = state.dashboard;
  return {
    user: ownProps.me ? myProfile.data : activeFriendProfile.data,
  };
};
export default connect(mapStateToProps, null)(ProfileModal);
