import { Form, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useInitiateManualDisbursement } from "features/payroll/hooks/disbursement/useInitiateManualDisbursement";
import { TPayrollWalletPaymentProvider } from "features/payroll/types/wallet";
import { WALLET_PAYMENT_PROVIDERS } from "features/payroll/constants";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";

type FormData = { walletProvider: TPayrollWalletPaymentProvider };
export const DisbursePayroll: React.FC<IModalProps & { payrollId: number }> = ({
  open,
  handleClose,
  payrollId,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<FormData>();
  const { mutate, isLoading } = useInitiateManualDisbursement();

  const handleSubmit = (data: FormData) => {
    mutate(
      {
        payrollId,

        data: {
          walletProvider: data?.walletProvider,
        },
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPROVAL_REQUESTS]);
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Disburse Payroll"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item<FormData>
          rules={textInputValidationRules}
          name="walletProvider"
          label="Select Wallet to disburse from"
        >
          <Select
            options={WALLET_PAYMENT_PROVIDERS.map((item) => ({
              value: item,
              label: <span className="capitalize">{item}</span>,
            }))}
            placeholder="Select Wallet to disburse payroll"
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" label="Confirm" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
