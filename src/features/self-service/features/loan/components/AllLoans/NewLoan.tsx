import { DatePicker, Form, Input, InputNumber, Modal, Tooltip } from "antd";
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
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../../hooks/analytics/useGetLoanAnalytics";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { FileUpload } from "components/FileUpload";
import { FormLoanTypeInput } from "../settings/loanTypes/FormLoanTypeInput";
import { FormLoanPlanInput } from "../settings/repaymentPlans/FormLoanPlanInput";
import { FormUnlicensedEmployeeSSRequestInput } from "features/core/employees/components/FormEmployeeInput";
import { EligibilityModal } from "./EligibilityModal";
import { useLoanWorthinessInput } from "../../hooks/useLoanWorthinessInput";
import { useCheckEligibility } from "../../hooks/worthiness/useCheckEligibility";

type ILoanStateTpe = {
  id: number;
  interestRate: number;
};

export const NewLoan: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm<TRequestForLoanData>();
  const { mutate, isLoading: isLoadingCreateLoan } = useRequestForLoan();
  const getDocumentUrl = useCurrentFileUploadUrl("documentUrl");
  const [requiresForm, setRequiresForm] = useState(false);
  const [loanTypeDetails, setLoanTypeDetails] = useState<ILoanStateTpe>();
  const [openEligibility, setOpenEligibility] = useState(false);
  const [lPlanDetail, setLPlanDetail] = useState<number>();
  const { worthinessInput, setAmount } = useLoanWorthinessInput(null, 500);

  const { data, isSuccess } = useCheckEligibility({
    amount: worthinessInput?.amount ?? 0,
    paymentPlanId: lPlanDetail ?? 0,
    typeId: loanTypeDetails?.id ?? 0,
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        loanEligibility: data?.isEligible ? "Eligible" : "Not Eligible",
      });
    } else {
      form.resetFields();
    }
  }, [form, data, isSuccess]);

  const handleSubmit = (values: any) => {
    if (requiresForm && !getDocumentUrl) {
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
        ...values,
        documentUrl: getDocumentUrl ? [getDocumentUrl] : [],
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
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_ANALYTICS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
          });
        },
      }
    );
  };

  return (
    <>
      <EligibilityModal
        open={openEligibility}
        handleClose={() => setOpenEligibility(false)}
        salary={data?.salary ?? ""}
        loanAmount={data?.loanAmount ?? 0}
        paymentPeriod={data?.paymentPeriod ?? { name: "", label: "" }}
        interest={data?.interest ?? 0}
        deduction={data?.deduction ?? { percentage: "", amount: 0 }}
        isEligible={data?.isEligible ?? false}
        errorMessage={data?.errorMessage ?? ""}
      />
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
            <FormUnlicensedEmployeeSSRequestInput
              Form={Form}
              control={{
                name: "employeeId",
                label: "Select Unlicensed Employee",
              }}
            />
            <FormLoanTypeInput
              Form={Form}
              handleSelect={(_, val) => setLoanTypeDetails(val)}
            />

            <Form.Item
              rules={[dateHasToBeGreaterThanCurrentDayRule]}
              name="date"
              label="Date"
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              rules={generalValidationRules}
              name="amount"
              label="Amount"
            >
              <InputNumber
                className="w-full"
                placeholder="Amount"
                onChange={setAmount}
                min={50}
                max={99999999}
              />
            </Form.Item>
          </div>
          <div>
            {loanTypeDetails?.interestRate && (
              <span className="text-sm mb-5 text-green-600">
                Interest Rate ={loanTypeDetails?.interestRate}%
              </span>
            )}
          </div>

          <div>
            <FormLoanPlanInput
              Form={Form}
              handleSelect={(_, val) => setLPlanDetail(val?.id)}
            />
            {isSuccess && (
              <span
                className="text-sm mb-5 text-green-600 underline cursor-pointer"
                onClick={() => setOpenEligibility(true)}
              >
                View Loan Calculator
              </span>
            )}
          </div>

          <div>
            <Form.Item
              name="loanEligibility"
              label="Loan Eligibility"
              tooltip="This represent/show your eligibility of loan request"
            >
              <Input disabled />
            </Form.Item>
            {isSuccess && (
              <Tooltip title={data?.errorMessage}>
                <span className="text-sm text-green-600 underline">
                  See Reason
                </span>
              </Tooltip>
            )}
          </div>

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
            <AppButton type="submit" isLoading={isLoadingCreateLoan} />
          </div>
        </Form>
      </Modal>
    </>
  );
};
