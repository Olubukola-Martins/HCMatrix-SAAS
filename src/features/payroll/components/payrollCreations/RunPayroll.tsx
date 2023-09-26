import { DatePicker, Form, Modal } from "antd";
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
import { dateHasToBeGreaterThanDayRule } from "utils/formHelpers/validation";

interface IProps extends IModalProps {
  payrollId?: number;
  allowDisbursement?: boolean;
}

export const RunPayroll: React.FC<IProps> = ({
  open,
  handleClose,
  payrollId,
  allowDisbursement,
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
            disbursementDate: data.disbursementDate
              ? data.disbursementDate.format(DEFAULT_DATE_FORMAT)
              : undefined,
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
        <span className="text-base font-semibold block pb-4">
          Are you sure you want to run payroll?
        </span>
        {allowDisbursement && (
          <Form.Item
            name="disbursementDate"
            label="Enter Day for Disbursement Date"
            rules={[
              {
                required: true,
              },
              dateHasToBeGreaterThanDayRule,
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        )}

        <div className="flex justify-end gap-4">
          <AppButton
            type="button"
            label="Cancel"
            variant="transparent"
            handleClick={() => handleClose()}
          />
          <AppButton type="submit" label="Continue" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
