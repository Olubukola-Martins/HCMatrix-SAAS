import { Form, Input, Modal, Skeleton } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { IModalProps } from "types";
import { useGetLoan } from "../hooks/useGetLoan";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps extends IModalProps {
  id: number;
}

export const LoanDetails = ({ id, open, handleClose }: IProps) => {
  const [form] = Form.useForm();
  const { data, isFetching } = useGetLoan({ id });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        employee: `${getEmployeeFullName(data.employee)} `,
        title: `${data.title} `,
        amount: `${data.amount} `,
        date: moment(data.date).format(DEFAULT_DATE_FORMAT),
        type: data.type.name,
        paymentPlan: data.paymentPlan.name,
        description: data.description,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      closeIcon={false}
      title={"Loan Details"}
      style={{ top: 10 }}
      footer={null}
    >
      <Skeleton loading={isFetching} active paragraph={{ rows: 16 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
          <Form.Item label="Employee" name="employee">
            <Input placeholder="Employee" />
          </Form.Item>
          <Form.Item label="Title" name="title">
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input placeholder="amount" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input placeholder="date" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Input placeholder="type" />
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
