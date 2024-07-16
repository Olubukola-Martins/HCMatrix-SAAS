import { Form, Input, InputNumber, Modal, Radio } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

export const AddLoanType = ({ handleClose, open }: IModalProps) => {
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Add Loan Type`}
    >
      <Form requiredMark={false} layout="vertical">
        <Form.Item
          name="name"
          label="Loan Type"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>

        <Form.Item name="maxLoanPercentage" rules={generalValidationRules}>
          <InputNumber
            placeholder="Percentage"
            className="w-full"
            min={1}
            max={100}
          />
        </Form.Item>

        <Form.Item
          name="interest"
          label="Do you want to attach an interest rate to this loan type"
          rules={generalValidationRules}
        >
          <Radio.Group className="flex flex-col gap-4">
            <Radio value={`no`}>No</Radio>
            <Radio value={`yes`}>Yes</Radio>
          </Radio.Group>
        </Form.Item>

        <AppButton type="submit" label="Add" />
      </Form>
    </Modal>
  );
};
