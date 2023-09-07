import { Switch, Form, InputNumber, Input } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle, inputStyle } from "styles/reused";
import {
  numberInputValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

const RepaymentPlan = () => {
  const [paymentPlanSwitch, setPaymentPlanSwitch] = useState(false);
  const [form] = Form.useForm();

  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Set Payment Plan</h5>
        <Switch
          checked={paymentPlanSwitch}
          onChange={(value) => {
            setPaymentPlanSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        Define different loan repayment plans and their corresponding durations
      </p>
      {paymentPlanSwitch && (
        <Form className="mt-4" form={form} layout="inline">
          <Form.Item name="name" rules={textInputValidationRules}>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="duration" rules={numberInputValidationRules}>
            <InputNumber
              className="w-full"
              placeholder="Enter the duration in months"
            />
          </Form.Item>
          <span
            onClick={() => form.submit()}
            className="text-sm cursor-pointer text-caramel font-medium text-right block pt-2 underline"
          >
            + Add
          </span>
          <div className="flex items-center justify-between mt-6 mb-2">
            <button
              type="button"
              onClick={() => setPaymentPlanSwitch(false)}
              className="transparentButton"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default RepaymentPlan;
