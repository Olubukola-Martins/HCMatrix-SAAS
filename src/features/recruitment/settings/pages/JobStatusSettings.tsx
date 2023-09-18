import React from 'react'
import { Form, Switch, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import '../../assets/style.css'
import { textInputValidationRules } from "utils/formHelpers/validation";


export const JobStatusSettings = () => {
      const [form] = Form.useForm();

      const handleSubmit = (values: any) => {
        console.log("Received values of form:", values);
      };

      const handleAddField = () => {
        const newStatus = form.getFieldValue("newStatus") || [];
        const initialStatus = {
          statusName: "",
          allowStatus: true,
        };
        form.setFieldsValue({
          newStatus: [...newStatus, initialStatus],
        });
      };

      const handleRemoveField = (index: number) => {
        const newStatus = form.getFieldValue("newStatus") || [];
        form.setFieldsValue({
          newStatus: newStatus.filter((_: any, i: number) => i !== index),
        });
      };

  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base">Job Status</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="jobStatusSettings"
          >
            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">On- Hold</h3>
              <Form.Item
                name="onHold"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Filled</h3>
              <Form.Item
                name="filled"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Open </h3>
              <Form.Item
                name="open"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Cancelled</h3>
              <Form.Item
                name="cancelled"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div>
              <h2 className="pb-5 font-medium text-base">Status name</h2>
              <Form.List name="newStatus">
                {(fields) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className="grid grid-cols-2 ">
                        <Form.Item
                          {...field}
                          name={[field.name, "statusName"]}
                          label="Name"
                          rules={textInputValidationRules}
                        >
                          <Input placeholder="Enter status name" />
                        </Form.Item>
                        <div className="flex gap-5 items-center justify-end">
                          <Form.Item
                            {...field}
                            name={[field.name, "allowStatus"]}
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
                      label="+ Add Job Status"
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
