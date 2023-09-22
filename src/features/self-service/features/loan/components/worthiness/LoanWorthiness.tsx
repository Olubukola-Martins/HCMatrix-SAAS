import React, { useEffect } from "react";
import { Input, Skeleton } from "antd";
import {
  TLoanWorthinessInputData,
  useGetLoanWorthiness,
} from "../../hooks/worthiness/useGetLoanWorthiness";
import { openNotification } from "utils/notifications";
import { FileUpload } from "components/FileUpload";
import { boxStyle } from "styles/reused";

const LoanWorthiness: React.FC<{
  input: TLoanWorthinessInputData;
  handleRequiresForm: (val: boolean) => void;
}> = ({ input, handleRequiresForm }) => {
  const { amount, paymentPlanId } = input;
  const { data, isFetching } = useGetLoanWorthiness({
    amount,
    paymentPlanId,
  });

  useEffect(() => {
    if (!data) return;
    openNotification({
      state: data?.isWorthy ? "success" : "info",
      title: data?.isWorthy ? "Success" : "Warning",
      description: data.worthinessMessage,
      duration: 0,
    });
    handleRequiresForm(data.requiresForm);
  }, [data]);
  return (
    <Skeleton loading={isFetching} active paragraph={{ rows: 1 }}>
      <div className="flex flex-col gap-3 mb-4">
        <p
          className={`${
            typeof data?.isWorthy === "boolean" && data?.isWorthy
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          Loan Worthiness
        </p>
        <Input.TextArea value={data?.worthinessMessage} disabled size="small" />
        {data?.requiresForm && (
          <div className={boxStyle}>
            <FileUpload
              allowedFileTypes={[
                "image/jpeg",
                "image/png",
                "image/jpg",
                "application/pdf",
              ]}
              fileKey="documentUrl"
              textToDisplay="Upload File"
              displayType="form-space-between"
            />
          </div>
        )}
      </div>
    </Skeleton>
  );
};

export default LoanWorthiness;
