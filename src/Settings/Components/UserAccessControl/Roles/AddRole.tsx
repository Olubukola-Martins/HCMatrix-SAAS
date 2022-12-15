import { Form, Input, Modal, Select } from "antd";
import React from "react";
import { IModalProps } from "../../../../AppTypes/Component";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";

export const AddRole = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Role"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 10 }}
    >
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="Role Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="e.g Administration" size="large" />
        </Form.Item>
        <Form.Item
          name="employee"
          label="Applicable to"
          rules={generalValidationRules}
        >
          <Select showSearch placeholder="Select employee" size="large">
            <Select.Option value="Godswill">Godswill Onyeoma</Select.Option>
            <Select.Option value="ode">Isaac Ode</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => handleClose(false)}
            className="transparentButton"
          >
            Cancel
          </button>
          <button type="submit" className="button">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};
