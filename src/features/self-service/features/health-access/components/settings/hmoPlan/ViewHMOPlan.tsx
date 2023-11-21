import { Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  numberHasToBeAWholeNumberRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { THMOPlan } from "../../../types/hmoPlan";

interface IProps extends IModalProps {
  hmoPlan?: THMOPlan;
}

export const ViewHMOPlan: React.FC<IProps> = ({
  open,
  handleClose,
  hmoPlan,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: hmoPlan?.name,
      maxDependents: hmoPlan?.maxDependents,
      description: hmoPlan?.description,
    });
  }, [hmoPlan, form]);

  if (!hmoPlan) return null;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"HMO Plan"}
      style={{ top: 20 }}
    >
      <Form layout="vertical" form={form} requiredMark={false} disabled>
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          rules={[numberHasToBeAWholeNumberRule]}
          name="maxDependents"
          label="Max Dependents"
        >
          <InputNumber placeholder="Max Dependents" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
