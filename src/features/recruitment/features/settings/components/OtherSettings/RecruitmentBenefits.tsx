import { Form, Input, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { benfitsSettings } from "./constants/DefaultOtherSettings";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";

export const RecruitmentBenefits = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  const handleAddField = () => {
    const newBenefits = form.getFieldValue("newBenefits") || [];
    const initialBenefits = { benefitName: "", benefitStatus: true };
    form.setFieldsValue({ newBenefits: [...newBenefits, initialBenefits] });
  };

  const handleRemoveField = (index: number) => {
    const newBenefits = form.getFieldValue("newBenefits") || [];
    form.setFieldsValue({
      newBenefits: newBenefits.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <div>
      <p className="p-2 text-base mb-3">
        Toggle on the benefit you want for your organization and add more
        benefits if need be.
      </p>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        {benfitsSettings.map((item) => (
          <OtherSettingsFormSwitch label={item.label} name={item.name} />
        ))}
        <Form.List name="newBenefits">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex justify-between items-center"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "benefitName"]}
                    label="Benefit Name"
                    className="w-full"
                    rules={generalValidationRules}
                  >
                    <Input placeholder="Add Benefit" />
                  </Form.Item>

                  <div className="flex items-center justify-end gap-3 w-full">
                    <Form.Item
                      valuePropName="checked"
                      name={[field.name, "benefitStatus"]}
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
                label="Add New Benefit"
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
