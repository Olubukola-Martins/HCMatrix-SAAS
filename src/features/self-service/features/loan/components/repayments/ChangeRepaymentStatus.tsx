import { DatePicker, Form, Modal } from "antd";
import { IModalProps } from "types";
import { dateHasToBeGreaterThanCurrentDayRule } from "utils/formHelpers/validation";

export const ChangeRepaymentStatus = ({
  handleClose,
  open,
  id,
}: IModalProps) => {
  const [form] = Form.useForm();
  const onSubmit = (val: any) => {};
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Change Status`}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          rules={[dateHasToBeGreaterThanCurrentDayRule]}
          name="date"
          label="Date"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
