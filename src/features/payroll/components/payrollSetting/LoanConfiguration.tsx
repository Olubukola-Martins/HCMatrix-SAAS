import { Checkbox, Input, InputNumber, Switch, Tooltip } from "antd";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import {
  generalValidationRulesOp,
  validateTimeFrameForManualRepayment,
} from "utils/formHelpers/validation";
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
              labelCol={{ span: 24 }}
              name="timeFrameForManualRepayment"
              label={
                <div className="flex gap-2 items-center">
                  <span>Time frame for manual repayment</span>
                  <Tooltip
                    showArrow={false}
                    title="Please not this will affect payroll creation, as per depending on what is set it will limit the time period within which payrolls can be created."
                  >
                    <i className="ri-information-fill text-lg" />
                  </Tooltip>
                </div>
              }
            >
              <Input.Group className="flex gap-4 w-full">
                <Form.Item
                  rules={[validateTimeFrameForManualRepayment]}
                  name={["timeFrameForManualRepayment", "startDay"]}
                  className="flex-1"
                  label={<span className="text-xs">Start Day</span>}
                >
                  <InputNumber placeholder="Start Day" className="w-full" />
                </Form.Item>
                <Form.Item
                  rules={[validateTimeFrameForManualRepayment]}
                  name={["timeFrameForManualRepayment", "endDay"]}
                  className="flex-1"
                  label={<span className="text-xs">End Day</span>}
                >
                  <InputNumber placeholder="End Day" className="w-full" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanConfiguration;
