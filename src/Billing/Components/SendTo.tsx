import { Form, Input, Modal } from "antd";
import { Rule } from "antd/lib/form";
import React from "react";
import {
  emailValidationRules,
  generalValidationRules,
} from "../../FormHelpers/validation";
import Themes from "../../Themes/Themes";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const SendTo = ({ open, handleClose }: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 400 }}
      title="Input Email"
      footer={null}
    >
      <Themes>
        <div>
          <Form
            initialValues={{
              email: "",
            }}
          >
            <div>
              <Form.Item name={"email"} rules={emailValidationRules as Rule[]}>
                <Input placeholder="Email Address" />
              </Form.Item>
            </div>

            <div className="flex items-center justify-around mt-5">
              <button
                type="button"
                onClick={() => handleClose()}
                className="transparentButton"
              >
                Cancel
              </button>
              <button type="submit" className="button">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </Themes>
    </Modal>
  );
};

export default SendTo;
