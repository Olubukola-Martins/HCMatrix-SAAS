import { Form, Input, Modal, Skeleton } from "antd";
import { useEffect } from "react";
import { IModalProps } from "types";
import { useGetSingleLoan } from "../../hooks/requests/useGetSingleLoan";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const LoanDetails = ({ open, handleClose, id }: IModalProps) => {
  const [form] = Form.useForm();
  const { data, isSuccess, isFetching } = useGetSingleLoan({ id: id ?? 0 });
  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        loanId: data.id.toString().padStart(7,'0'),
        type: data.type.name,
        date: dayjs(data.date).format(DEFAULT_DATE_FORMAT),
        amount: data.amount,
        paymentPlan: data.paymentPlan.name,
        description: data.description,
      });
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);

  

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Loan Details"}
      style={{ top: 20 }}
    >
      <Skeleton loading={isFetching} active paragraph={{ rows: 16 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
          <Form.Item label="Loan ID" name="loanId">
            <Input placeholder="Loan ID" />
          </Form.Item>
          <Form.Item label="Loan Type" name="type">
            <Input placeholder="Type" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input placeholder="date" />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input placeholder="amount" />
          </Form.Item>

          <Form.Item label="Payment Plan" name="paymentPlan">
            <Input placeholder="paymentPlan" />
          </Form.Item>

          <Form.Item name="description">
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};
