import { Form, Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle, inputStyle } from "styles/reused";
import { textInputValidationRules } from "utils/formHelpers/validation";
import LoanTypeTable from "./LoanTypeTable";

const LoanTypeSetup = () => {
  const [loanTypeSwitch, setLoanTypeSwitch] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Set Loan Types</h5>
        <Switch
          checked={loanTypeSwitch}
          onChange={(value) => {
            setLoanTypeSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        Define the various loan types that employees will be able to apply for
      </p>

      {loanTypeSwitch && (
        <Form className="mt-4" form={form}>
          <Form.Item name="name" rules={textInputValidationRules}>
            <input
              type="text"
              placeholder="Enter Loan Name"
              className={inputStyle}
            />
          </Form.Item>
          <span
            onClick={() => form.submit()}
            className="text-sm cursor-pointer text-caramel font-medium text-right block pt-2 underline"
          >
            + Add
          </span>

          <div className="mt-4">
            <LoanTypeTable data={[{ id: 500, name: "Car Loan" }]} />
          </div>
          <div className="flex items-center justify-between mt-6 mb-2">
            <button
              type="button"
              onClick={() => setLoanTypeSwitch(false)}
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

export default LoanTypeSetup;
