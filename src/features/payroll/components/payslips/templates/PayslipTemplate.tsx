import { Checkbox, Form, Input,  Select,  } from "antd";
import { AppButton } from "components/button/AppButton";
import {
  employeeInformationOptions,
} from "features/payroll/constants";
import React, { useEffect } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

type TPayrollReportTemplate = any;

const PayslipTemplate: React.FC<{
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

  return (
    <div className="bg-card px-2 md:px-5 py-3 rounded-md text-accent">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit?.fn}
        requiredMark={false}
        disabled={disabled}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            name="displayYearToDateCalcs"
            label="Choose the Year to Date data to display on 
            payslip."
          >
            <Checkbox.Group>
              <Checkbox value="YTD-Net">YTD-Net</Checkbox>
              <Checkbox value="YTD Gross">YTD Gross</Checkbox>
              <Checkbox value="YTD Tax">YTD Tax</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PayslipTemplate;
