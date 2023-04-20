import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

export const NewEvaluation = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      footer={null}
      open={open}
      onCancel={() => handleClose()}
      title="New Evaluation"
      style={{ top: 10 }}
    >
      <Form layout="vertical" requiredMark={false}>
        <Form.Item
          name="title"
          label="Evaluation Title"
          rules={textInputValidationRules}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="period"
          label="Select Measurement Period"
          rules={generalValidationRules}
        >
          <DatePicker.RangePicker format="YYYY-MM-DD" className="w-full" />
        </Form.Item>
        <FormRoleInput
          Form={Form}
          control={{ name: "role", label: "Select Role" }}
        />
        <FormEmployeeInput
          Form={Form}
          control={{ name: "employee", label: "Select Employee" }}
          mode="multiple"
        />
        
        <AppButton label="Set Evaluation" type="submit" />
      </Form>
    </Modal>
  );
};
