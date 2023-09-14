import { Checkbox, Form, Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRulesOp } from "utils/formHelpers/validation";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";

const LoanConfiguration = () => {
  const [bankDSwitch, setBankDSwitch] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Loan Configuration</h5>
        <Switch
          checked={bankDSwitch}
          onChange={(value) => {
            setBankDSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        Select the payroll schemes that will be eligible for loan
      </p>

      {bankDSwitch && (
        <div>
          <Form
            className="flex flex-col gap-4 mt-5"
            form={form}
            requiredMark={false}
          >
            <Form.Item
              rules={generalValidationRulesOp}
              name="payrollSchemes"
              label=""
            >
              <Checkbox.Group>
                {PAYROLL_SCHEME_OPTIONS.map((item, i) => (
                  <Checkbox value={item.value} key={i}>
                    <span className="capitalize">{item.label}</span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>

            <div className="flex items-center justify-between mt-6 mb-2">
              <button
                onClick={() => setBankDSwitch(false)}
                className="transparentButton"
                type="button"
              >
                Cancel
              </button>
              <button className="button" type="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LoanConfiguration;
