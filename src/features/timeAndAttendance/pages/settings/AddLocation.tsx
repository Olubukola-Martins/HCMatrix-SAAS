import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { Form, Select } from "antd";
import { useEffect } from "react";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";

export const AddLocation = () => {
  const formWrapStyle =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  const [form] = Form.useForm();

  useEffect(() => {
    const defaultField = { branch: "", biometrics: "" };
    form.setFieldsValue({ fields: [defaultField] });
  }, []);
  const handleFormSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = { branch: "", biometrics: "" };
    form.setFieldsValue({ fields: [...fields, newField] });
    console.log("hhh");
  };

  const handleRemoveField = (index: number) => {
    const fields = form.getFieldValue("fields") || [];
    form.setFieldsValue({
      fields: fields.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <>
      <TimeAttendanceSettingsNav active="add location" />
      <AttendanceSettingsIntro
        title={"Add Location"}
        description="Add your offices or places where your team members will be clocking in and out."
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
                          name={[field.name, "branch"]}
                          label="Select Branch"
                          className="w-full"
                          rules={generalValidationRules}
                        >
                          <Select
                            className="w-full"
                            placeholder="Select"
                            options={[
                              { label: "Branch 1", value: 1 },
                              { label: "Branch 2", value: 2 },
                            ]}
                          />
                        </Form.Item>

                        <div className="flex items-center gap-3 w-full">
                          <Form.Item
                            {...field}
                            name={[field.name, "biometrics"]}
                            label="Select Biometrics"
                            className="w-full"
                            rules={generalValidationRules}
                          >
                            <Select
                              className="w-full"
                              options={[
                                { value: 1, label: "Bio 1" },
                                { value: 2, label: "Bio 2" },
                              ]}
                            />
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
                      label="+ Add More"
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
