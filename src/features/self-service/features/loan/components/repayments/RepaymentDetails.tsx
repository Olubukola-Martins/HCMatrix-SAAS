import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { IModalProps } from "types";
import { TLoanRepayment } from "../../types";

interface IProps extends IModalProps {
  data: TLoanRepayment;
}

export const RepaymentDetails = ({ data, open, handleClose }: IProps) => {
  const [form] = Form.useForm<TLoanRepayment>();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      closeIcon={false}
      title={"Loan Repayment Details"}
      style={{ top: 10 }}
      footer={null}
    >
      <Form layout="vertical" requiredMark={false} form={form} disabled>
        <Form.Item label="Employee" name={"employeeFullName"}>
          <Input placeholder="Employee" />
        </Form.Item>
        <Form.Item label="Sender" name="sender">
          <Input placeholder="Sender" />
        </Form.Item>
        <Form.Item label="Receiver" name="receiver">
          <Input placeholder="receiver" />
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input placeholder="amount" />
        </Form.Item>
        <Form.Item label="Payment Type" name="paymentType">
          <Input placeholder="Payment Type" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input placeholder="reference" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Input placeholder="type" />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea rows={4} placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
