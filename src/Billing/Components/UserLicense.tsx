import React from "react";
import Themes from "../../Themes/Themes";
import * as Yup from "yup";
import { Form, Input, Modal, Select } from "antd";
import { inputValidationRules } from "../../FormHelpers/validation";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const UserLicense = ({ open, handleClose }: IProps) => {
  return (
    <>
      <Modal
        open={open}
        onCancel={() => handleClose()}
        title="User license"
        footer={null}
        style={{ maxWidth: 400 }}
      >
        <Themes>
          <div>
            <p className="text-sm text-slate-400 text-center pb-5">
              Input the number of employees and the number of years you want to
              pay for.
            </p>

            <Form
              initialValues={{
                userLicenseNumber: "",
                duration: "",
              }}
              labelCol={{ span: 24 }}
              requiredMark={false}
            >
              <div className="form-control">
                <Form.Item
                  label="Number of user license"
                  name={`userLicenseNumber`}
                  rules={inputValidationRules}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="form-control mt-5">
                <Form.Item
                  name="duration"
                  label="Subscription Duration"
                  rules={inputValidationRules}
                >
                  <Select>
                    <Select.Option value="1 Year">1 Year</Select.Option>
                    <Select.Option value="2 Years">2 Years</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="flex justify-around mt-5">
                <button
                  onClick={() => handleClose()}
                  type="button"
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
    </>
  );
};

export default UserLicense;
