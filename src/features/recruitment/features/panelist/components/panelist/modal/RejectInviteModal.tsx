import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";

interface StateReasonsModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (reasons: string) => void;
}

const RejectInviteModal: React.FC<StateReasonsModalProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values.reasons);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="State Reasons"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Reasons" name="reasons" rules={[{ required: true, message: "Please state your reasons!" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <p className="font-semibold text-lg hover:text-caramel cursor-pointer">Cancel</p>
            <AppButton label="Submit" type="submit" />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RejectInviteModal;
