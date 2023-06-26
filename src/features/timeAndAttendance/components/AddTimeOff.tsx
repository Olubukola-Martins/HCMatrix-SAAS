import { DatePicker, Form, Modal, Select, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";

export const AddTimeOff = ({ open, handleClose }: IModalProps) => {
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
        <Form.Item
          name="policy"
          label="Time off policy"
          rules={generalValidationRules}
        >
          <Select
            placeholder="Select"
            options={[{ label: "Medical policy", value: "Medical policy" }]}
          />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={generalValidationRules}>
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="time" label="Time" rules={generalValidationRules}>
          <TimePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason"
          requiredMark="optional"
          rules={textInputValidationRulesOp}
        >
          <TextArea />
        </Form.Item>
        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
