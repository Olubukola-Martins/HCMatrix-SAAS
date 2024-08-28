import { Checkbox, Form, Input, InputNumber, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useEffect, useState } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "utils/formHelpers/validation";
import { useCreatePaymentSettings } from "../../../hooks/setting/paymentSettings/useCreatePaymentSettings";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";
import {
  QUERY_KEY_FOR_GET_LOAN_PAYMENT_SETTINGS,
  useGetPaymentSettings,
} from "../../../hooks/setting/paymentSettings/useGetPaymentSettings";

export const PaymentSettings = () => {
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: loanCreateSettings } = useCreatePaymentSettings();
  const { data, isLoading, isSuccess } = useGetPaymentSettings();

  useEffect(() => {
    if (isSuccess && data) {
      form.setFieldsValue({
        enableAutomaticPayrollDeduction: data.enableAutomaticPayrollDeduction,
        notifyEmployeeViaEmailAboutDeduction:
          data.notifyEmployeeViaEmailAboutDeduction,
        isActive: data.enableManualRepayment.isActive,
        companyWallet: data.enableManualRepayment.companyWallet,
        directToBankAccount: data.enableManualRepayment.directToBankAccount,
        enableAutomaticPayrollDeductionForFailedRepayment:
          data.enableAutomaticPayrollDeductionForFailedRepayment,
        bankName: data?.enableManualRepayment?.bankAccountDetails?.bankName,
        accountName:
          data?.enableManualRepayment?.bankAccountDetails?.accountName,
        accountNumber:
          data?.enableManualRepayment?.bankAccountDetails?.accountNumber,
        swiftCode: data?.enableManualRepayment?.bankAccountDetails?.swiftCode,
      });
      setShowBankDetails(data.enableManualRepayment.directToBankAccount);
    }
  }, [data, isSuccess, form]);

  const onSubmit = (values: any) => {
    const manualRepaymentData: any = {
      isActive: values.isActive || false,
      companyWallet: values.companyWallet || false,
      directToBankAccount: values.directToBankAccount || false,
    };

    // Conditionally add bankAccountDetails if directToBankAccount is true
    if (manualRepaymentData.directToBankAccount) {
      const bankAccountDetails: any = {
        bankName: values.bankName || "",
        accountName: values.accountName || "",
        accountNumber: values.accountNumber || "",
      };

      // Conditionally add swiftCode if it is not empty
      if (values.swiftCode) {
        bankAccountDetails.swiftCode = values.swiftCode;
      }

      manualRepaymentData.bankAccountDetails = bankAccountDetails;
    }

    const payload = {
      ...values,
      enableManualRepayment: manualRepaymentData,
    };
    mutate(payload, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
          duration: 7.0,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res.data.message,
          duration: 4,
        });
        dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
        queryClient.invalidateQueries([
          QUERY_KEY_FOR_GET_LOAN_PAYMENT_SETTINGS,
        ]);
      },
    });
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
        form={form}
        disabled={isLoading}
      >
        <div className="flex items-center justify-between my-5">
          <h5 className="font-medium">Enable Automatic Payroll Deduction</h5>
          <Form.Item
            name="enableAutomaticPayrollDeduction"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </div>
        <h5 className="font-medium pb-2">Notification</h5>
        <Form.Item
          name="notifyEmployeeViaEmailAboutDeduction"
          label="Configure notifications to inform employees about deductions"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Notify employees via email</Checkbox>
        </Form.Item>

        <hr className="my-5" />
        <div className="flex items-center justify-between my-5">
          <h5 className="font-medium">Enable Manual Payment</h5>
          <Form.Item
            name="isActive"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <Form.Item
            valuePropName="checked"
            name="companyWallet"
            rules={generalValidationRules}
          >
            <Checkbox>Company Wallet</Checkbox>
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            name="directToBankAccount"
            initialValue={false}
          >
            <Checkbox
              onChange={(val) => setShowBankDetails(val.target.checked)}
            >
              Direct to bank account
            </Checkbox>
          </Form.Item>
        </div>
        {showBankDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="accountName"
              label="Account Name"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              name="swiftCode"
              label="SWIFT/BIC Code (for International transfer)"
              rules={textInputValidationRulesOpt}
            >
              <Input />
            </Form.Item>
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <h5 className="font-medium">
            Enable Automatic Payroll Deduction for employee that failed to make
            manual payment on the said date
          </h5>
          <Form.Item
            name="enableAutomaticPayrollDeductionForFailedRepayment"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </div>
        <AppButton
          type="submit"
          label="Save Changes"
          isLoading={loanCreateSettings}
        />
      </Form>
    </div>
  );
};
