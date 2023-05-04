import { Form, Modal, Input } from "antd";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";

export const AddSisterCompanyForm = ({ open, handleClose }: IModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Sister Company"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
      style={{ top: 10 }}
    >
      <Form layout="vertical" requiredMark={false} size="middle" form={form}>
        <Form.Item name="fullName" label="Parent Company">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="name"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Enter Company Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Business Email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
