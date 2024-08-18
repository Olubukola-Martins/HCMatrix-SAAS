import { Form, Input, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { jobStatusSettings } from "../constants/defaultOtherSettings";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";

export const JobStatus = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  const handleAddField = () => {
    const newJobStatus = form.getFieldValue("newJobStatus") || [];
    const initialJobStatus = {
      jobStatusName: "",
      jobStatus: true,
    };
    form.setFieldsValue({
      newJobStatus: [...newJobStatus, initialJobStatus],
    });
  };

  const handleRemoveField = (index: number) => {
    const newJobStatus = form.getFieldValue("newJobStatus") || [];
    form.setFieldsValue({
      newJobStatus: newJobStatus.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <div>
      <p className="p-2 text-base mb-3">
        Toggle on the job status you want for your organization and add more job
        statuses if need be.
      </p>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        {jobStatusSettings.map((item) => (
          <OtherSettingsFormSwitch label={item.label} name={item.name} />
        ))}
        <Form.List name="newJobStatus">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex justify-between items-center"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "jobStatusName"]}
                    label="Job Status Name"
                    className="w-full"
                    rules={generalValidationRules}
                  >
                    <Input placeholder="Add Job Status" />
                  </Form.Item>

                  <div className="flex items-center justify-end gap-3 w-full">
                    <Form.Item
                      valuePropName="checked"
                      name={[field.name, "jobStatus"]}
                      className="flex justify-end items-end"
                      noStyle
                    >
                      <Switch />
                    </Form.Item>

                    <i
                      className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                      onClick={() => handleRemoveField(index)}
                    ></i>
                  </div>
                </div>
              ))}

              <AppButton
                variant="transparent"
                label="Add New Job Status"
                handleClick={() => handleAddField()}
              />
            </>
          )}
        </Form.List>

        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
