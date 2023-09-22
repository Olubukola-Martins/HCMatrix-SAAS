import { DatePicker, Form,  Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useRunPayroll } from "features/payroll/hooks/payroll/useRunPayroll";
import { QUERY_KEY_FOR_SINGLE_PAYROLL } from "features/payroll/hooks/payroll/useGetSinglePayroll";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Moment } from "moment";
import moment from "moment";

interface IProps extends IModalProps {
  payrollId?: number;
}

export const RunPayroll: React.FC<IProps> = ({
  open,
  handleClose,
  payrollId,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useRunPayroll();

  const handleRunPayroll = (data: any) => {
    if (!payrollId) return;
    mutate(
      {
        data: {
          id: payrollId,
          body: {
            disbursementDate: data.disbursementDate.format(DEFAULT_DATE_FORMAT),
          },
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_PAYROLL],
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Run Payroll"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleRunPayroll}
        requiredMark={false}
      >
        <Form.Item
          name="disbursementDate"
          label="Enter Day for Disbursement Date"
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                const isDateGreaterThanCurrentDay = (date: Moment) => {
                  const currentDate = moment();
                  return date.isAfter(currentDate, "day"); // Check if selected date is greater than the current day
                };
                if (!isDateGreaterThanCurrentDay(value)) {
                  throw new Error(
                    "Please select a date greater than the current day"
                  );
                }

                return true;
              },
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
