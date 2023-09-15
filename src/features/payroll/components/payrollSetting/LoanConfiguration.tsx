import { Checkbox, Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRulesOp } from "utils/formHelpers/validation";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";

const LoanConfiguration: React.FC<{
  Form: any;
}> = ({ Form }) => {
  const [bankDSwitch, setBankDSwitch] = useState(false);

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
          <div className="flex flex-col gap-4 mt-5">
            <Form.Item rules={generalValidationRulesOp} name="schemes" label="">
              <Checkbox.Group>
                {PAYROLL_SCHEME_OPTIONS.map((item, i) => (
                  <Checkbox value={item.value} key={i}>
                    <span className="capitalize">{item.label}</span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanConfiguration;
