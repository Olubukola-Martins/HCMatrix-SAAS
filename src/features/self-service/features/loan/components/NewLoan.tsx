import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanCurrentDayRule,
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
// import { FormLoanTypeInput } from "./settings/loanTypes/FormLoanTypeInput";
// import { FormLoanRepaymentPlanInput } from "./settings/repaymentPlans/FormLoanRepaymentPlanInput";
import LoanWorthiness from "./worthiness/LoanWorthiness";
import { TLoanWorthinessInputData } from "../hooks/worthiness/useGetLoanWorthiness";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../hooks/analytics/useGetLoanAnalytics";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";

export const NewLoan: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TRequestForLoanData>();
  const { mutate, isLoading } = useRequestForLoan();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const [requiresForm, setRequiresForm] = useState(false);
  const handleSubmit = (data: TRequestForLoanData) => {
    if (requiresForm && !documentUrl) {
      openNotification({
        state: "error",
        title: "Guarantor's Form Required",
        description: "Please upload a guarantor's form!",
        duration: 0,
      });
      return;
    }
    mutate(
      {
        ...data,
        guarantorFormUrls: documentUrl ? [documentUrl] : [],
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 5,
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
            queryKey: [QUERY_KEY_FOR_LOAN_ANALYTICS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
        },
      }
    );
  };
  const [worthinessInput, setWorthinessInput] =
    useState<TLoanWorthinessInputData>({});
  const handleRequiresForm = (val: boolean) => {
    setRequiresForm(val);
  };
  const [_, startTransition] = React.useTransition();
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
        <Form.Item
          rules={[dateHasToBeGreaterThanCurrentDayRule]}
          name="date"
          label="Date"
        >
          <DatePicker className="w-full" />
        </Form.Item>
        {/* <FormLoanTypeInput
          Form={Form}
          control={{ name: "typeId", label: "Type" }}
        /> */}
        {/* <FormLoanRepaymentPlanInput
          Form={Form}
          control={{ name: "paymentPlanId", label: "Payment Plan" }}
         
          handleClear={() =>
            setWorthinessInput((prev) => ({
              ...prev,
              paymentPlanId: undefined,
            }))
          }
        /> */}

        <Form.Item rules={generalValidationRules} name="amount" label="Amount">
          <InputNumber
            className="w-full"
            placeholder="Amount"
            // TODO: Implement Debounce for this
            onChange={(val: number | null) =>
              startTransition(() =>
                setWorthinessInput((prev) => ({ ...prev, amount: val ?? 0 }))
              )
            }
          />
        </Form.Item>
        <LoanWorthiness
          input={worthinessInput}
          handleRequiresForm={handleRequiresForm}
        />
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
