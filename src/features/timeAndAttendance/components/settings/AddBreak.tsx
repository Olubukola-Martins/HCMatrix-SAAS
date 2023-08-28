import { Checkbox, Drawer, Form, Input, Select, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { useEffect } from "react";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

export const AddBreak = ({ handleClose, open }: IDrawerProps) => {
  const { drawerSize } = UseWindowWidth();
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
    <Drawer
      title="Add break"
      size={drawerSize}
      onClose={() => handleClose()}
      open={open}
    >
      <Form
        onFinish={handleFormSubmit}
        form={form}
        layout="vertical"
        className="mt-4 "
        requiredMark={false}
      >
        <Form.List name="fields">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="md:grid grid-cols-1 md:grid-cols-2 gap-x-5"
                >
                  <div>
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      label="Break name"
                      rules={generalValidationRules}
                    >
                      <Input placeholder="first break" />
                    </Form.Item>
                  </div>

                  <div className="flex items-center gap-3 w-full">
                    <Form.Item
                      {...field}
                      name={[field.name, "duration"]}
                      label="Break duration"
                      rules={generalValidationRules}
                      className="w-full"
                    >
                      <Input placeholder="1h: 0mn" />
                    </Form.Item>
                    <i
                      className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                      onClick={() => handleRemoveField(index)}
                    ></i>
                  </div>

                  <div>
                    <Form.Item name="timeRange" label="Time range">
                      <TimePicker.RangePicker className="w-full" />
                    </Form.Item>
                  </div>

                  <div>
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
                  </div>

                  <Form.Item className="col-span-2">
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
    </Drawer>
  );
};
