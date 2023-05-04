import { DatePicker, Form, Input, Modal } from "antd";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";

export const AddMedication = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Medication"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item
          name="condition"
          label="Condition"
          rules={textInputValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Condition" />
        </Form.Item>
        <Form.Item
          name="onsetDate"
          label="Date of Onset"
          rules={generalValidationRules}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <button className="button">Submit</button>
      </Form>
    </Modal>
  );
};
