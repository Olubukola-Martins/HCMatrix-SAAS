import { Form, Input, Modal } from "antd";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";

export const AddFromAddress = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add From Address"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="Display Name"
          rules={textInputValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Add display name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="From Address"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            {
              type: "email",
              message: "Enter a valid email",
            },
          ]}
        >
          <Input className="generalInputStyle" placeholder="john@gmail.com" />
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Modal>
  );
};
