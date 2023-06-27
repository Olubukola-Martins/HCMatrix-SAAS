import { DatePicker, Form, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";

export const TimeEntryForm = () => {
  return (
    <Form layout="vertical" onFinish={(val) => console.log(val)}>
      <Form.Item
        name="time"
        label="Start & End Time"
        rules={generalValidationRules}
        required={false}
      >
        <TimePicker.RangePicker className="w-full" />
      </Form.Item>
      <Form.Item
        name="break"
        label="Start & End Break Time"
        rules={generalValidationRules}
        required={false}
      >
        <TimePicker.RangePicker className="w-full" />
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
