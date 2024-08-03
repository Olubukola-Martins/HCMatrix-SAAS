import { Form, Modal, Select } from "antd";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

export const LoanPaymentPlanStatus = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Change Status"}
      style={{ top: 10 }}
    >
      <Form>
        <Form.Item name="status" label="Status" rules={generalValidationRules}>
          <Select
            allowClear
            placeholder="Please select"
            options={[
              {
                value: 1,
                label: "Paid",
              },
              {
                value: 0,
                label: "Unpaid",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
