import { DatePicker, Form, InputNumber, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";

export const HourEntryForm = () => {
  return (
    <Form layout="vertical" onFinish={(val) => console.log(val)}>
      <Form.Item
        name="time"
        label="Enter how many hours"
        rules={generalValidationRules}
        required={false}
      >
        <InputNumber className="w-full" placeholder="Eg: 8hrs"/>
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={generalValidationRules}
        required={false}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item name="note" label="Add a note" requiredMark="optional">
        <TextArea />
      </Form.Item>

      <AppButton type="submit" />
    </Form>
  );
};
