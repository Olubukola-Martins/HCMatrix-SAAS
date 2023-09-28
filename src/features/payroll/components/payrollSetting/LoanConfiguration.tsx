import { Checkbox, InputNumber, Switch } from "antd";
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
          title="Toggling switch will activate or deactivate loan"
        />
      </div>
      <p className="text-sm pt-2">
        You can activate loan and select the payroll schemes that will be
        eligible for loan
      </p>

      {loanActivation && (
        <div>
          <div className="flex flex-col gap-4 mt-5">
            <Form.Item
              rules={generalValidationRulesOp}
              name="schemes"
              label="Select Schemes"
            >
              <Checkbox.Group>
                {PAYROLL_SCHEME_OPTIONS.filter(
                  (item) => item.value !== "project"
                )
                  .filter((item) => item.value !== "wages")
                  .map((item, i) => (
                    <Checkbox value={item.value} key={i}>
                      <span className="capitalize">{item.label}</span>
                    </Checkbox>
                  ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="payrollCreationTimeFrameLimit"
              label="What is the time frame limit for payrolls to be created within a month ?"
              labelCol={{ span: 24 }}
              rules={[
                {
                  validator: async (_: any, value: number | string) => {
                    if (+value < 1) {
                      throw new Error(
                        "Please enter a day that is either 1st or between 1st and 28th"
                      );
                    }
                    if (+value > 28) {
                      throw new Error(
                        "Please enter a day that is either 1st or between 1st and 28th"
                      );
                    }

                    return true;
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="Payroll Creation Time Frame Limit"
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanConfiguration;
