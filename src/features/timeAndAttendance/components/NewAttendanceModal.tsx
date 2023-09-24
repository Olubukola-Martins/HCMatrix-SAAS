import { DatePicker, Form, Input, Modal, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

export const NewAttendanceModal = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add New"
      style={{ top: 15 }}
    >
      <Form
        layout="vertical"
        // requiredMark={false}
        onFinish={(val) => console.log(val)}
      >
        <FormEmployeeInput
          Form={Form}
          control={{ name: "employee", label: "Select Employee" }}
          mode="multiple"
        />
        <Form.Item name="time" label="Time" rules={generalValidationRules}>
          <TimePicker.RangePicker
            className="w-full"
            format="HH:mm"
            placeholder={["Time In", "Time Out"]}
          />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={generalValidationRules}>
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="reasons" label="Reasons" requiredMark="optional">
          <Input.TextArea />
        </Form.Item>
        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
