import { Input, Select, Switch, Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import React from "react";
import { textInputValidationRules } from "utils/formHelpers/validation";

interface IJobTemplateFormProps {
  handleSubmit: (val: any) => void;
}
export const JobTemplateForm: React.FC<IJobTemplateFormProps> = ({
  handleSubmit,
}) => {
  const [form] = Form.useForm();
  return (
    <div className="Container">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div className="flex justify-between items-center py-3 my-2">
          <div className="flex gap-8 items-center w-full">
            <div>
              <Form.Item
                rules={textInputValidationRules}
                required
                name="templateName"
                label="Job Name"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="w-1/3">
              <FormDepartmentInput Form={Form} />
            </div>
          </div>
        </div>

        <Form.Item
          label="Job Description"
          rules={textInputValidationRules}
          name="jobDescription"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Key Responsibilities"
          rules={textInputValidationRules}
          name="responsibilities"
        >
          <Input.TextArea rows={10} />
        </Form.Item>

        <Form.Item
          label="Experience"
          rules={textInputValidationRules}
          name="experience"
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <div className="flex justify-end items-center gap-5">
          <AppButton label="Cancel" variant="transparent" type="reset" />
          <AppButton label="Save Template" type="submit" />
        </div>
      </Form>
    </div>
  );
};
