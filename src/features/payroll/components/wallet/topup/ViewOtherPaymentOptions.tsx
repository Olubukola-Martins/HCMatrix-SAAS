import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { numberHasToBeGreaterThanZeroRule } from "utils/formHelpers/validation";

interface IProps extends IModalProps {
  minTopup?: string;
}

export const ViewOtherPaymentOptions: React.FC<IProps> = ({
  open,
  handleClose,
  minTopup = "$100",
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={
        <div>
          <h3 className="text-lg font-semibold">Top-up Wallet</h3>
          <span>Minimum Top up is {minTopup} </span>
        </div>
      }
      style={{ top: 20 }}
    >
      <Form layout="vertical" form={form} requiredMark={false} disabled>
        <Form.Item rules={[numberHasToBeGreaterThanZeroRule]} name="amount">
          <Input placeholder="Amount" />
        </Form.Item>
        <div>
          <AppButton label="Cancel" variant="transparent" />
          <AppButton label="Proceed" type="submit" />
        </div>
      </Form>
    </Modal>
  );
};
