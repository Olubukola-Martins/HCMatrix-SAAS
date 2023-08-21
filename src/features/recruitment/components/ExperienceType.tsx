import React from 'react'
import { Form, Switch, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import "../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";


export const ExperienceType = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
      console.log("Received values of form:", values);
    };

    const handleAddField = () => {
      const newType = form.getFieldValue("newType") || [];
      const initialExperienceType = {
        ExperienceTypeName: "",
        allowExperienceType: true,
      };
      form.setFieldsValue({ newType: [...newType, initialExperienceType] });
    };

    const handleRemoveField = (index: number) => {
      const newType = form.getFieldValue("newType") || [];
      form.setFieldsValue({
        newType: newType.filter((_: any, i: number) => i !== index),
      });
    };

  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base">Experience type</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="experienceTypeSettings"
          >
            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Entry-Level</h3>
              <Form.Item
                name="entryLevel"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Mid-Level</h3>
              <Form.Item
                name="midLevel"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Experienced</h3>
              <Form.Item
                name="experienced"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Manager/Supervisor</h3>
              <Form.Item
                name="managerSupervisor"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Senior Manager/Supervisor</h3>
              <Form.Item
                name="seniorManagerSupervisor"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Executive</h3>
              <Form.Item
                name="executive"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Senior Executive</h3>
              <Form.Item
                name="seniorExecutive"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div>
              <h2 className="pb-5 font-medium text-base">Type name</h2>
              <Form.List name="newType">
                {(fields) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className="grid grid-cols-2 ">
                        <Form.Item
                          {...field}
                          name={[field.name, "ExperienceTypeName"]}
                          label="Name"
                          rules={textInputValidationRules}
                        >
                          <Input placeholder="Enter status name" />
                        </Form.Item>
                        <div className="flex gap-5 items-center justify-end">
                          <Form.Item
                            {...field}
                            name={[field.name, "allowExperienceType"]}
                            noStyle
                            valuePropName="checked"
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
                      label="+ Add Experience type"
                      handleClick={() => handleAddField()}
                    />
                  </>
                )}
              </Form.List>
            </div>
            <div className="flex justify-between self-center mt-5 w-96 ml-auto max-sm:w-full max-lg:w-80">
              <button
                className="text-base font-medium hover:text-caramel"
                type="reset"
              >
                Cancel
              </button>
              <AppButton type="submit" label="Add" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
