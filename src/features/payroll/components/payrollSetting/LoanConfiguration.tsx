import { Checkbox, Switch } from "antd";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRulesOp } from "utils/formHelpers/validation";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";

const LoanConfiguration: React.FC<{
  Form: any;
  loanActivation: boolean;
  handleLoanActivation: (val: boolean) => void;
}> = ({ Form, loanActivation, handleLoanActivation }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Loan Configuration</h5>
        <Switch
          checked={loanActivation}
          onChange={(value) => {
            handleLoanActivation(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        Select the payroll schemes that will be eligible for loan
      </p>

      {loanActivation && (
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
