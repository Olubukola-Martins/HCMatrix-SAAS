import { DatePicker, Form, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

export const AssignTraining = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Assign Training"
      style={{ top: 15 }}
    >
      <Form layout="vertical">
        <Form.Item name="department" label="Select Department">
          <Select placeholder="Select" options={[{ label: "Dev", value: 1 }]} />
        </Form.Item>
        <Form.Item name="delegation" label="Select Delegation">
          <Select placeholder="Select" options={[{ label: "Dev", value: 1 }]} />
        </Form.Item>
        <Form.Item name="startDate" label="Start Date">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="mode" label="Select Training mode">
          <Select
            placeholder="Select"
            options={[
              { label: "Paid", value: 1 },
              { label: "Unpaid", value: 2 },
            ]}
          />
        </Form.Item>
        <AppButton label="Assign" type="submit" />
      </Form>
    </Modal>
  );
};
