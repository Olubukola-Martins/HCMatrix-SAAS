import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";

export const AddCostCentre: React.FC<IModalProps> = ({ open, handleClose }) => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Cost Centre"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Cost Centre Name"
        >
          <Input placeholder="Cost Centre Name" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="accountNo"
          label="Account No.(Acc Details)"
        >
          <Input placeholder="Account No." />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" />
        </div>
      </Form>
    </Modal>
  );
};
