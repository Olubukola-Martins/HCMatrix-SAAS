import { Form, Input, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";
import { employmentTypeSettings } from "../constants/defaultOtherSettings";

export const EmploymentType = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  const handleAddField = () => {
    const newEmploymentType = form.getFieldValue("newEmploymentType") || [];
    const initialEmploymentType = {
      employmentName: "",
      employmentStatus: true,
    };
    form.setFieldsValue({
      newEmploymentType: [...newEmploymentType, initialEmploymentType],
    });
  };

  const handleRemoveField = (index: number) => {
    const newEmploymentType = form.getFieldValue("newEmploymentType") || [];
    form.setFieldsValue({
      newEmploymentType: newEmploymentType.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };
  return (
    <div>
      <p className="p-2 text-base mb-3">
        Toggle on the employment type you want for your organization and add
        more employment types if need be.
      </p>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        {employmentTypeSettings.map((item) => (
          <OtherSettingsFormSwitch label={item.label} name={item.name} />
        ))}
        <Form.List name="newEmploymentType">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex justify-between items-center"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "employmentName"]}
                    label="Employment Name"
                    className="w-full"
                    rules={generalValidationRules}
                  >
                    <Input placeholder="Add Employment Type" />
                  </Form.Item>

                  <div className="flex items-center justify-end gap-3 w-full">
                    <Form.Item
                      valuePropName="checked"
                      name={[field.name, "employmentStatus"]}
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
                label="Add New Employment Type"
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
