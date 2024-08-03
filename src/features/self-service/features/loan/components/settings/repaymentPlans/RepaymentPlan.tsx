import { Form, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

export const RepaymentPlan = ({ handleClose, open }: IModalProps) => {
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Add payment plan`}
    >
      <Form layout="vertical" requiredMark={false}>
        <Form.Item
          name="plan"
          label="How many months"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <AppButton type="submit" label="Add" />
      </Form>
    </Modal>
  );
};
