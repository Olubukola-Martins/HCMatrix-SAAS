import { Checkbox, Form, Input, Select, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { useEffect } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const WorkBreak = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    const defaultField = {
      name: "",
      duration: "",
      timeRange: "",
      BreakPaymentStatus: "",
    };
    form.setFieldsValue({ fields: [defaultField] });
  }, []);

  const handleFormSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = {
      name: "",
      duration: "",
      timeRange: "",
      BreakPaymentStatus: "",
    };
    form.setFieldsValue({ fields: [...fields, newField] });
  };

  const handleRemoveField = (index: number) => {
    const fields = form.getFieldValue("fields") || [];
    form.setFieldsValue({
      fields: fields.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <div className="border rounded-md p-3 md:p-5 mt-5">
      <h3 className="font-semibold text-lg">Breaks</h3>
      <p>
        Schedule breaks by setting fixed times or durations here. If left empty,
        members can clock into breaks freely.
      </p>

      <Form
        onFinish={handleFormSubmit}
        form={form}
        layout="vertical"
        className="mt-4"
        requiredMark={false}
      >
        <Form.List name="fields">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="grid grid-cols-1 md:grid-cols-3 gap-x-5"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "name"]}
                    label="Break name"
                    className="w-full"
                    rules={generalValidationRules}
                  >
                    <Input placeholder="first break" />
                  </Form.Item>

                  <div className="flex items-center gap-3 w-full">
                    <Form.Item
                      {...field}
                      name={[field.name, "duration"]}
                      label="Break duration"
                      className="w-full"
                      rules={generalValidationRules}
                    >
                      <Input placeholder="1h: 0mn" />
                    </Form.Item>
                    <i
                      className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                      onClick={() => handleRemoveField(index)}
                    ></i>
                  </div>
                  <div></div>
                  <Form.Item name="timeRange" label="Time range">
                    <TimePicker.RangePicker className="w-full" />
                  </Form.Item>
                  <Form.Item
                    name="BreakPaymentStatus"
                    label="Break payment status"
                  >
                    <Select
                      options={[
                        { value: "paid", label: "Paid" },
                        { value: "Unpaid", label: "Unpaid" },
                      ]}
                      placeholder="Select"
                    />
                  </Form.Item>
                  <div></div>
                  <Form.Item>
                    <Checkbox>Allow break to be taken between</Checkbox>
                  </Form.Item>
                </div>
              ))}

              <div className="flex gap-5">
                <AppButton
                  variant="transparent"
                  label="+ Add More"
                  handleClick={() => handleAddField()}
                />
                <AppButton label="Save" type="submit" />
              </div>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
