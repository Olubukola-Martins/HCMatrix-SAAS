import { Form, Input, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

const employeeInformationOptions = [
  {
    label: "Date of Birth",
    value: "dob",
  },
  {
    label: "Staff ID",
    value: "empuid",
  },
  {
    label: "Address",
    value: "address",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Phone Number",
    value: "phoneNumber",
  },
  {
    label: "Bank Information",
    value: "bankInformation",
  },
  {
    label: "Full Name",
    value: "fullName",
  },
  {
    label: "Designation",
    value: "designation",
  },
  {
    label: "Exchange Rate",
    value: "exchangeRate",
  },
  {
    label: "Branch",
    value: "branch",
  },
  {
    label: "Department",
    value: "department",
  },
  {
    label: "Tax Information",
    value: "taxId",
  },
  {
    label: "NSITF Information",
    value: "nstifId",
  },
  {
    label: "ITF Information",
    value: "itfId",
  },
  {
    label: "Pension Information",
    value: "pensionId",
  },
  {
    label: "Payroll Type",
    value: "payrollType",
  },
];
const payrollInformationOptions = [
  {
    label: "Net Pay",
    value: "netPay",
  },
  {
    label: "Cost Centre",
    value: "costCentre",
  },
  {
    label: "Gross Pay",
    value: "grossPay",
  },
  {
    label: "NSITF",
    value: "nsitf",
  },
  {
    label: "ITF",
    value: "itf",
  },
  {
    label: "Pension",
    value: "pension",
  },
  {
    label: "Tax",
    value: "tax",
  },
  {
    label: "Overtime",
    value: "overtime",
  },

  {
    label: "Leave allowance",
    value: "leaveAllowance",
  },
  {
    label: "13th Month Salary",
    value: "13thMonthSalary",
  },
  {
    label: "Total Allowances",
    value: "totalAllowances",
  },
  {
    label: "Total Deductions",
    value: "totalDeductions",
  },
];

type TPayrollReportTemplate = any;

const PayrollReportTemplate: React.FC<{
  handleSubmit?: { fn: (data: any) => void; isLoading?: boolean };
  template?: TPayrollReportTemplate;
  disabled?: boolean;
}> = ({ handleSubmit, template, disabled = false }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!template) return;
    form.setFieldsValue({
      name: template.name,
      description: template.description,
      // .... so on and forth
    });
  }, [form, template]);

  // TODO:
  // This component should be reused for editing/viewing and the handle submit should be passed in
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit?.fn}
      requiredMark={false}
      disabled={disabled}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {handleSubmit && (
          <div className="col-span-2 flex justify-end">
            <AppButton
              type="submit"
              isLoading={handleSubmit?.isLoading}
              label="Save"
            />
          </div>
        )}
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input className="w-full" placeholder="Template Name" />
        </Form.Item>

        <Form.Item
          rules={generalValidationRules}
          name="employeeInformation"
          label="Employee Information"
        >
          <Select
            options={employeeInformationOptions}
            mode="multiple"
            className="w-full"
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            placeholder="Employee Information to display in report"
          />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea
            className="w-full"
            placeholder="Describe the report template"
          />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="payrollInformation"
          label="Payroll Information"
        >
          <Select
            options={payrollInformationOptions}
            mode="multiple"
            className="w-full"
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            placeholder="Payroll Information to display in report"
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default PayrollReportTemplate;
