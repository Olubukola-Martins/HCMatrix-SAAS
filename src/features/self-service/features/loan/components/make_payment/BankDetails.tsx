import { Form, Input } from "antd";
import { useEffect } from "react";

interface IProps {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
}

export const BankDetails = ({
  accountName,
  accountNumber,
  bankName,
  swiftCode,
}: IProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      accountName,
      accountNumber,
      bankName,
      swiftCode,
    });
  }, [form]);
  return (
    <>
      <Form form={form} layout="vertical" disabled className="mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item name="bankName" label="Bank Name">
            <Input />
          </Form.Item>
          <Form.Item name="accountNumber" label="Account Number">
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="accountName" label="Account Name">
          <Input />
        </Form.Item>
        <Form.Item
          name="swiftCode"
          label="SWIFT/BIC Code (for International transfer)"
        >
          <Input />
        </Form.Item>
        <p className="text-sm -mt-2">
          <b>NOTE:</b> Please transfer the repayment amount to the above bank
          account and include your loan ID number in the payment details
        </p>
      </Form>
    </>
  );
};
