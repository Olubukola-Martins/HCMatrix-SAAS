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
} from "../../hooks/useRequestForLoan";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../../hooks/requests/useGetLoanRequests";
import { QUERY_KEY_FOR_LOAN } from "../../hooks/useGetLoan";
import { TLoanWorthinessInputData } from "../../hooks/worthiness/useGetLoanWorthiness";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../../hooks/analytics/useGetLoanAnalytics";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { FileUpload } from "components/FileUpload";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Form.Item
            rules={generalValidationRules}
            name="loanType"
            label="Loan Type"
          >
            <Select options={[]} />
          </Form.Item>

          <Form.Item
            rules={[dateHasToBeGreaterThanCurrentDayRule]}
            name="date"
            label="Date"
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            rules={generalValidationRules}
            name="amount"
            label="Amount"
          >
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
          <span className="text-sm mb-5 text-green-600">
            Interest Rate = 5%
          </span>
        </div>

        <div>
          <Form.Item
            name="payment_plan"
            label="Payment Plan"
            rules={generalValidationRulesOp}
          >
            <Select options={[]} />
          </Form.Item>
          <span className="text-sm mb-5 text-green-600 underline">
            View Loan Calculator
          </span>
        </div>

        <Form.Item
          name="loanEligibility"
          label="Loan Eligibility"
          tooltip="This represent/show your eligibility of loan request "
        >
          <Input disabled />
        </Form.Item>

        <div className="my-3">
          <h5 className="pb-2">Upload Document (optional)</h5>
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            fileKey="documentUrl"
            textToDisplay="Add Documents"
            displayType="dotted-box"
          />
        </div>

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
