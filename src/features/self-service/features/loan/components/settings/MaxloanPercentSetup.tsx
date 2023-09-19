import { InputNumber, Radio } from "antd";
import React from "react";
import { boxStyle, boxTitle, inputStyle } from "styles/reused";
import { generalValidationRules } from "utils/formHelpers/validation";

const MaxloanPercentSetup: React.FC<{
  Form: any;
}> = ({ Form }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Set Maximum Loan Percentage</h5>
      </div>
      <p className="text-sm pt-2">
        Select the course of action to take regards the max loan percentage
      </p>

      <div>
        <div className="flex flex-col gap-4 mt-4">
          <Form.Item name="maxLoanPercentage" rules={generalValidationRules}>
            <InputNumber
              placeholder="Percentage"
              className="w-full"
              min={1}
              max={100}
            />
          </Form.Item>

          <Form.Item name="loanLimit" rules={generalValidationRules}>
            <Radio.Group className="flex flex-col gap-4">
              <Radio value={`cannotExceedMaxLoanPercentage`}>
                Employees can not exceed set loan percentage
              </Radio>
              <Radio value={`shouldFillGuarantorsForm`}>
                If employees should apply for loans that exceed the set loan
                percentage, employees should fill guarantor's forms
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default MaxloanPercentSetup;
