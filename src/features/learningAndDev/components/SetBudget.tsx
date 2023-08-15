import { Form, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

export const SetBudget = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Set Up Budget"
      style={{ top: 15 }}
    >
      <Form layout="vertical">
        <Form.Item name="department" label="Department">
          <Select
            placeholder="Select"
            options={[{ value: 21, label: "App Dev" }]}
          />
        </Form.Item>

        <Form.Item name="allocation" label="Allocation">
          <InputNumber className="w-full" placeholder="0.00" />
        </Form.Item>
      </Form>

      <AppButton label="Save" type="submit" />
    </Modal>
  );
};
