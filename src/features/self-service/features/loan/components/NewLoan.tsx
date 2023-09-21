import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import {
  TRequestForLoanData,
  useRequestForLoan,
} from "../hooks/useRequestForLoan";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../hooks/requests/useGetLoanRequests";
import { QUERY_KEY_FOR_LOAN } from "../hooks/useGetLoan";
import { FormLoanTypeInput } from "./settings/loanTypes/FormLoanTypeInput";
import { FormLoanRepaymentPlanInput } from "./settings/repaymentPlans/FormLoanRepaymentPlanInput";

export const NewLoan: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TRequestForLoanData>();
  const { mutate, isLoading } = useRequestForLoan();

  const handleSubmit = (data: TRequestForLoanData) => {
    mutate(
      {
        ...data,
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
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"New Loan"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={generalValidationRules} name="title" label="Title">
          <Input className="w-full" placeholder="Title" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="date" label="Date">
          <DatePicker className="w-full" />
        </Form.Item>
        <FormLoanTypeInput
          Form={Form}
          control={{ name: "typeId", label: "Type" }}
        />
        <FormLoanRepaymentPlanInput
          Form={Form}
          control={{ name: "paymentPlanId", label: "Payment Plan" }}
        />

        <Form.Item rules={generalValidationRules} name="amount" label="Amount">
          <InputNumber className="w-full" placeholder="Amount" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} label="Loan Worthiness (Why)">
          <Input placeholder="0%" disabled />
        </Form.Item>
        <Form.Item
          rules={generalValidationRulesOp}
          name="description"
          label="Description"
        >
          <Input.TextArea className="w-full" placeholder="Description" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
