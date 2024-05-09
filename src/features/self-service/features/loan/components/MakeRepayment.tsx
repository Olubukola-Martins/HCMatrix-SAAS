import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { FormEmployeeLoanInput } from "./FormEmployeeLoanInput";
import { QUERY_KEY_FOR_LOAN_REPAYMENTS } from "../hooks/repayment/useGetLoanRepayments";
import { useMakeLoanRepayment } from "../hooks/repayment/useMakeLoanRepayment";
import { QUERY_KEY_FOR_LOAN } from "../hooks/useGetLoan";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../hooks/analytics/useGetLoanAnalytics";

export const MakeRepayment: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useMakeLoanRepayment();
  const [url, setUrl] = useState<string>();
  const handleSubmit = (data: any) => {
    mutate(
      {
        amount: data.amount,
        loanId: data.loanId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.message,
            // duration: 0.4,
          });
          setUrl(res.data.authorization_url);
          form.resetFields();
        },
      }
    );
  };
  const [balance, setBalance] = useState<number>();
  const onCancel = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_LOAN_REPAYMENTS],
      // exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_LOAN],
      // exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_LOAN_ANALYTICS],
      // exact: true,
    });
    handleClose();
  };
  return (
    <Modal
      open={open}
      onCancel={() => onCancel()}
      footer={null}
      title={"Make Repayment"}
      style={{ top: 20 }}
    >
      <div className={`${url ? "block" : "hidden"}`}>
        <iframe
          src={url}
          width="100%"
          height="850"
          frameBorder="0"
          title="Paystack"
          id="paystack-frame"
        ></iframe>
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        className={`${!url ? "block" : "hidden"}`}
      >
        <FormEmployeeLoanInput
          Form={Form}
          control={{ label: "Select Loan", name: "loanId" }}
          handleSelect={(_, val) => setBalance(val?.balance)}
        />
        <Form.Item rules={generalValidationRules} label="Balance">
          <Input placeholder="Balance" disabled value={balance} />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="amount" label="Amount">
          <InputNumber className="w-full" placeholder="Amount" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
