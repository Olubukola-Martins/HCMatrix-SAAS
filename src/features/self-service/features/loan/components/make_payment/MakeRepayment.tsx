import { Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { FormEmployeeLoanInput } from "../FormEmployeeLoanInput";
import { QUERY_KEY_FOR_LOAN_REPAYMENTS } from "../../hooks/repayment/useGetLoanRepayments";
import { useMakeLoanRepayment } from "../../hooks/repayment/useMakeLoanRepayment";
import { QUERY_KEY_FOR_LOAN } from "../../hooks/useGetLoan";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../../hooks/analytics/useGetLoanAnalytics";
import { BankDetails } from "./BankDetails";
import { AllLoanRequestProps } from "../../types/loan";
import { useGetPaymentSettings } from "../../hooks/setting/paymentSettings/useGetPaymentSettings";

export const MakeRepayment: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data, isLoading: isLoadingPaymentSettings } = useGetPaymentSettings();
  const {
    accountName = "",
    accountNumber = "",
    bankName = "",
    swiftCode = "",
  } = data?.enableManualRepayment?.bankAccountDetails || {};
  const { mutate, isLoading } = useMakeLoanRepayment();


  const handleSubmit = (data: any) => {
    mutate(
      {
        amount: data.amount,
        loanId: data.loanId,
        paymentMethod: data.paymentMethod,
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
          });

          form.resetFields();
        },
      }
    );
  };
  const [loanDe, setLoanDe] = useState<AllLoanRequestProps>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");

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
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormEmployeeLoanInput
          Form={Form}
          control={{ label: "Select Loan", name: "loanId" }}
          handleSelect={(_, val) => setLoanDe(val)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item rules={generalValidationRules} label="Balance">
            <Input
              placeholder="Balance"
              disabled
              value={loanDe?.balance.toLocaleString()}
            />
          </Form.Item>
          <Form.Item rules={generalValidationRules} label="Repayment Plan">
            <Input
              placeholder="Repayment plan"
              disabled
              value={loanDe?.paymentPlan?.name}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="paymentMethod"
          label="Select Payment Method"
          rules={generalValidationRules}
        >
          <Select
            placeholder="Select"
            allowClear
            loading={isLoadingPaymentSettings}
            onChange={(val) => setPaymentMethod(val)}
            options={[
              {
                label: "Bank Transfer",
                value: "bank-transfer",
                disabled: data?.enableManualRepayment?.companyWallet
                  ? false
                  : true,
              },
              {
                label: "Company Wallet",
                value: "wallet",
                disabled: data?.enableManualRepayment?.directToBankAccount
                  ? false
                  : true,
              },
            ]}
          />
        </Form.Item>
        {paymentMethod === "bank-transfer" && (
          <BankDetails
            bankName={bankName}
            accountName={accountName}
            accountNumber={accountNumber}
            swiftCode={swiftCode}
          />
        )}
        <Form.Item
          rules={generalValidationRules}
          name="amount"
          label="Repayment Amount"
        >
          <InputNumber className="w-full" placeholder="Amount" />
        </Form.Item>
        {paymentMethod === "wallet" && (
          <p className="text-sm -mt-2">
            <b>NOTE:</b> Please Enter your card details to make a payment
            directly to the company's wallet.
          </p>
        )}
        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
