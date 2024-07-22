import { Form, Input } from "antd";

export const BankDetails = () => {
  return (
    <>
      <Form layout="vertical" disabled className="mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item name="bankName" label="Bank Name">
            <Input />
          </Form.Item>
          <Form.Item name="AccountNumber" label="Account Number">
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="AccountName" label="Account Name">
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
