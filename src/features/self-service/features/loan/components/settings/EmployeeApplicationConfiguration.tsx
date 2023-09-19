import { InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRules } from "utils/formHelpers/validation";

export const EmployeeApplicationConfiguration: React.FC<{
  Form: any;
}> = ({ Form }) => {
  return (
    <div className={boxStyle}>
      <h5 className={`${boxTitle} mb-2`}>
        Set Employee Application Configuration
      </h5>

      <Form.Item
        label="What is the maximum amount of loans an employee can apply for at once?"
        name={`maxAllowedLoanApplications`}
        labelCol={{ span: 24 }}
        rules={generalValidationRules}
      >
        <InputNumber
          className="w-full"
          placeholder="Maximum Amount of loans per employee"
        />
      </Form.Item>
      <Form.Item
        label="What is the maximum amount of loans an employee can apply for while repaying a loan?"
        name={`maxLoansDuringRepayment`}
        rules={generalValidationRules}
        labelCol={{ span: 24 }}
      >
        <InputNumber
          className="w-full"
          placeholder="Maximum Amount of loans per employee while repaying loan"
        />
      </Form.Item>
    </div>
  );
};
