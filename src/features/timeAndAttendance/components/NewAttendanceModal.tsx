import { Form, Input, Modal, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

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
        <Form.Item name="timeIn" label="Time In" rules={generalValidationRules}>
          <TimePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="timeOut"
          label="Time Out"
          rules={generalValidationRules}
        >
          <TimePicker className="w-full" />
        </Form.Item>
        <Form.Item name="reasons" label="Reasons" requiredMark="optional">
          <Input.TextArea />
        </Form.Item>
        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
