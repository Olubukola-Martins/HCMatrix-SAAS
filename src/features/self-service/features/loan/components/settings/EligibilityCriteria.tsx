import { Checkbox, Form, InputNumber, Switch, Tooltip } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import { generalValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";

export const EligibilityCriteria = () => {
  return (
    <div>
      <h3 className="font-medium pb-5">Eligibility Criteria</h3>
      <p className="text-sm pb-3">
        Define the employees that are eligible to apply for a loan
      </p>
      <hr />

      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={(val) => console.log(val)}
      >
        <div className="flex items-center justify-between my-4">
          <h5 className="font-medium">Select employment duration</h5>
          <Form.Item
            name="employmentDuration"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </div>
        <Form.Item
          name="selectEmploymentDuration"
          // noStyle
          rules={generalValidationRules}
        >
          <Checkbox.Group>
            <Checkbox value="1-2">1-2 year</Checkbox>
            <Checkbox value="2-4">1-4 years</Checkbox>
            <Checkbox value="5-10_above">5-10 years above</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <hr className="mt-4" />

        <div className="flex items-center justify-between my-4">
          <h5 className="font-medium">Select employee status</h5>
          <Form.Item
            name="employee_status"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </div>

        <Form.Item
          name="check_employee_status"
          rules={generalValidationRules}
        >
          <Checkbox.Group className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Checkbox value="Confirmed_employee">Confirmed employee</Checkbox>
            <Checkbox value="Not_confirmed_employee">
              Not confirmed employee
            </Checkbox>
            <Checkbox value="Probation_employee">Probation employee</Checkbox>
            <Checkbox value="Suspended_employee">Suspended employee</Checkbox>
            <Checkbox value="Licensed_employee">Licensed employee</Checkbox>
            <Checkbox value="Unlicensed_employee">Unlicensed employee</Checkbox>
            <Checkbox value="Unverified_employee">Unverified employee</Checkbox>
            <Checkbox value="Verified employee">Verified employee</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <hr className="my-4" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium">Set Maximum Loan Percentage</h4>
            <Tooltip title="This represent the percentage (%) of the annual gross salary of the employee that can be taken as a loan.">
              <i className="ri-information-line text-lg cursor-pointer"></i>
            </Tooltip>
          </div>
          <Form.Item
            name="loan_percentage"
            label="Define the loan percentage (%) of the annual gross salary of the employee that can be taken as a loan"
            rules={generalValidationRules}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="5"
              suffix={
                <PercentageOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              }
              className="w-full"
            />
          </Form.Item>
        </div>

        <Form.Item
          rules={generalValidationRules}
          name="maximum_loan_amount"
          label="What is the maximum amount of loans an employee can apply for while repaying a loan?"
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <AppButton type="submit" label="Save Changes" />
      </Form>
    </div>
  );
};
