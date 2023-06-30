import { Form, Input, InputNumber, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { generalValidationRules } from "utils/formHelpers/validation";

interface FormData {
  biometricsName: string;
  serialNumber: string;
}
export const ClockIn = () => {
  const formWrapStyle =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  const [form] = Form.useForm();

  const handleFormSubmit = (values: FormData[]) => {
    console.log("Form submitted:", values);
  };

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = { biometricsName: "", serialNumber: "" };
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
      <TimeAttendanceSettingsNav active="clock in settings" />
      <AttendanceSettingsIntro
        title={"Clock in Settings"}
        description="Select Clock-in options."
      />

      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <Form
              form={form}
              onFinish={handleFormSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">Allow soft clock-in</h3>
                <Form.Item
                  name="softClockIn"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow Biometrics device clock-in
                </h3>
                <Form.Item
                  name="allowBiometrics"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <Form.List name="fields">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div
                        key={field.key}
                        className={`${formWrapStyle} grid grid-cols-1 md:grid-cols-2 gap-x-7`}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "biometricsName"]}
                          label="Name"
                          className="w-full"
                          rules={generalValidationRules}
                        >
                          <Input />
                        </Form.Item>

                        <div className="flex items-center gap-3 w-full">
                          <Form.Item
                            {...field}
                            name={[field.name, "serialNumber"]}
                            label="Serial Number"
                            className="w-full"
                            rules={generalValidationRules}
                          >
                            <InputNumber className="w-full" />
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
                      label="+ Add Biometrics"
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
      </div>
    </>
  );
};
