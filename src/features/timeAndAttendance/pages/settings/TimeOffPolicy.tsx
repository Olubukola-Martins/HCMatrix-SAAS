import { Form, Input, InputNumber, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const TimeOffPolicy = () => {
  const [form] = Form.useForm();
  const { companyId, token, currentUserEmployeeId } = useApiAuth();

  const handleFormSubmit = (values: FormData[]) => {
    console.log("Form submitted:", values);
  };

  useEffect(() => {
    const defaultField = { policy: "", duration: "", comment: "" };
    form.setFieldsValue({ fields: [defaultField] });
  }, []);

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = { policy: "", duration: "", comment: "" };
    form.setFieldsValue({ fields: [...fields, newField] });
  };

  const handleRemoveField = (index: number) => {
    const fields = form.getFieldValue("fields") || [];
    form.setFieldsValue({
      fields: fields.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <>
      <TimeAttendanceSettingsNav active="time off policy" />
      <AttendanceSettingsIntro
        title={"Create Time Off Policy"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings"
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <Form form={form} onFinish={handleFormSubmit} layout="vertical">
            <Form.List name="fields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
                        <Form.Item
                          {...field}
                          name={[field.name, "policy"]}
                          label="Create Time Policy"
                          className="w-full"
                          rules={generalValidationRules}
                          required={false}
                        >
                          <Input placeholder="eg: medical policy" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "duration"]}
                          label="Duration in days"
                          className="w-full"
                          rules={generalValidationRules}
                          required={false}
                        >
                          <InputNumber className="w-full" />
                        </Form.Item>
                      </div>
                      <Form.Item
                        {...field}
                        name={[field.name, "comment"]}
                        label="Enter Comment"
                        className="w-full"
                        requiredMark="optional"
                      >
                        <TextArea className="w-full " rows={3} />
                      </Form.Item>
                      <div className="flex justify-end">
                        <i
                          className="ri-delete-bin-line -mt-3 text-xl text-red-400 cursor-pointer hover:text-caramel"
                          onClick={() => handleRemoveField(index)}
                        ></i>
                      </div>
                    </div>
                  ))}

                  <AppButton
                    variant="transparent"
                    label="+ Add Time off policy"
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
      </div>
    </>
  );
};
