import { Checkbox, Form, Input, InputNumber, Radio, Switch, Tabs } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { RepaymentPlan } from "./RepaymentPlan";
import { PaymentSettings } from "./PaymentSettings";
import { PaymentPlan } from "./PaymentPlan";

export const ConfigurePayment = () => {
  const [manualPayment, setManualPayment] = useState("wallet");
  const [addNewPlan, setAddNewPlan] = useState(false);

  const tabItems = [
    {
      key: "1",
      label: `Payment Settings`,
      children: <PaymentSettings />,
      hidden: false,
    },
    {
      key: "2",
      label: `Payment Plan`,
      children: <PaymentPlan />,
    },
  ];

  return (
    <div>
      <RepaymentPlan
        open={addNewPlan}
        handleClose={() => setAddNewPlan(false)}
      />

      <Tabs defaultActiveKey="1" items={tabItems} />

      {/* <h3 className="font-medium pb-5">Payment Settings</h3> */}
      {/* <hr /> */}
      {/* <Form
        layout="vertical"
        onFinish={(val) => console.log(val)}
        requiredMark={false}
      >
     
      

       
      

      
        {manualPayment === "bank" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="AccountName"
              label="Account Name"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="AccountNumber"
              label="Account Number"
              rules={generalValidationRules}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              name="swiftCode"
              label="SWIFT/BIC Code (for International transfer)"
              rules={textInputValidationRules}
            >
              <Input />
            </Form.Item>
          </div>
        )}

        <hr className="my-5" />

        <div className="flex items-center justify-between mb-5">
          <h5 className="font-medium">
            Allow employee define their payment plan
          </h5>
          <Form.Item
            name="employee_define_plan"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </div>
        <p className="text-sm pb-3">
          Checkbox the payment plan you want your organization to work with. You
          can also add more payment play by clicking on the add plan button.
        </p>

        <Form.Item
          name="payment_plan"
          label="Please Note you can't change the default payment plan"
          rules={generalValidationRules}
        >
          <Checkbox.Group className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Checkbox value="1">1 Month</Checkbox>
            <Checkbox value="2">2 Months</Checkbox>
            <Checkbox value="3">3 Months</Checkbox>
            <Checkbox value="6">6 Months</Checkbox>
            <Checkbox value="12">12 Months</Checkbox>
            <Checkbox value="24">24 Months</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <AppButton
          label="+Add Plan"
          variant="transparent"
          handleClick={() => setAddNewPlan(true)}
        />
        <hr className="my-5" />

        <div className="flex items-center justify-between mb-5">
          <h5 className="font-medium">
            Enable Automatic Payroll Deduction for employee that failed to make
            manual payment on the said date
          </h5>
          <Form.Item
            name="automatic_deduction_for_failed_manual_payment"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </div>

        <AppButton type="submit" label="Save Changes" />
      </Form> */}
    </div>
  );
};
