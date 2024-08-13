import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
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
import { FormLoanTypeInput } from "../settings/loanTypes/FormLoanTypeInput";
import { FormLoanPlanInput } from "../settings/repaymentPlans/FormLoanPlanInput";
import { FormUnlicensedEmployeeSSRequestInput } from "features/core/employees/components/FormEmployeeInput";
import { EligibilityModal } from "./EligibilityModal";
import { useLoanWorthinessInput } from "../../hooks/useLoanWorthinessInput";

type ILoanStateTpe = {
  id: number;
  interestRate: number;
};

export const NewLoan: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm<TRequestForLoanData>();
  const { mutate, isLoading } = useRequestForLoan();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const [requiresForm, setRequiresForm] = useState(false);
  const [loanTypeDetails, setLoanTypeDetails] = useState<ILoanStateTpe>();
  const [openEligibility, setOpenEligibility] = useState(false);
  const [lPlanDetail, setLPlanDetail] = useState<number>();
  const { worthinessInput, setAmount } = useLoanWorthinessInput(null, 500);

  const handleSubmit = (values: any) => {
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
        ...values,
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
        typeId={loanTypeDetails?.id as unknown as number}
        paymentPlanId={lPlanDetail as unknown as number}
        amount={worthinessInput?.amount as unknown as number}
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
                // TODO: Implement Debounce for this
                onChange={setAmount}
                min={50}
                max={99999999}
              />
            </Form.Item>
          </div>
          <div>
            <span className="text-sm mb-5 text-green-600">
              Interest Rate ={" "}
              {loanTypeDetails?.interestRate ? loanTypeDetails.interestRate : 0}
              %
            </span>
          </div>

          <div>
            <FormLoanPlanInput
              Form={Form}
              handleSelect={(_, val) => setLPlanDetail(val?.id)}
            />
            <span
              className="text-sm mb-5 text-green-600 underline cursor-pointer"
              onClick={() => setOpenEligibility(true)}
            >
              View Loan Calculator
            </span>
          </div>

          <div>
            <Form.Item
              name="loanEligibility"
              label="Loan Eligibility"
              tooltip="This represent/show your eligibility of loan request "
            >
              <Input disabled />
            </Form.Item>
            <Tooltip
              title="You are not eligible because you can only make loan request below
              #000,000."
            >
              <span className="text-sm text-green-600 underline">
                See Reason
              </span>
            </Tooltip>
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
            <AppButton type="submit" isLoading={isLoading} />
          </div>
        </Form>
      </Modal>
    </>
  );
};
