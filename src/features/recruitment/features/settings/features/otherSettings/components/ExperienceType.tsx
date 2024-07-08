import { Form, Input, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";
import { experienceTypeSettings } from "../constants/defaultOtherSettings";

export const ExperienceType = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  const handleAddField = () => {
    const newExperienceType = form.getFieldValue("newExperienceType") || [];
    const initialEexperienceType = {
      experienceName: "",
      experienceStatus: true,
    };
    form.setFieldsValue({
      newExperienceType: [...newExperienceType, initialEexperienceType],
    });
  };

  const handleRemoveField = (index: number) => {
    const newExperienceType = form.getFieldValue("newExperienceType") || [];
    form.setFieldsValue({
      newExperienceType: newExperienceType.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };
  return (
    <div>
      <p className="p-2 text-base mb-3">
        Toggle on the experience type you want for your organization and add
        more experience types if need be.
      </p>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        {experienceTypeSettings.map((item) => (
          <OtherSettingsFormSwitch label={item.label} name={item.name} />
        ))}
        <Form.List name="newExperienceType">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex justify-between items-center"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "experienceName"]}
                    label="Experience Name"
                    className="w-full"
                    rules={generalValidationRules}
                  >
                    <Input placeholder="Add Experience Type" />
                  </Form.Item>

                  <div className="flex items-center justify-end gap-3 w-full">
                    <Form.Item
                      valuePropName="checked"
                      name={[field.name, "experienceStatus"]}
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
                label="Add New Experience Type"
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
