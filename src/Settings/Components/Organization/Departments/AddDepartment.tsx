import { Form, Input, Modal } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";
import {
  emailValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";

export const AddDepartment = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Department"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="Department Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Department" className="generalInputStyle" />
        </Form.Item>
        <Form.Item name="mail" label="Mail Alias" rules={emailValidationRules}>
          <Input placeholder="john@gmail.com" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="departmentHead"
          label="Department Head"
          rules={textInputValidationRules}
        >
          <Input placeholder="Department head" className="generalInputStyle" />
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Modal>
  );
};
