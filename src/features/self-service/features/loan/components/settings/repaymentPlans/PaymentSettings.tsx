import { Checkbox, Form, Input, InputNumber, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "utils/formHelpers/validation";

export const PaymentSettings = () => {
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);
   
  return (
    <div>
      <Form
        layout="vertical"
        onFinish={(val) => console.log(val)}
        requiredMark={false}
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
          rules={generalValidationRules}
          valuePropName="checked"
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
            initialValue={true}
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
            <Checkbox>Direct to bank account</Checkbox>
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            name="directToBankAccount"
            rules={generalValidationRules}
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
        <AppButton type="submit" label="Save Changes" />
      </Form>
    </div>
  );
};
