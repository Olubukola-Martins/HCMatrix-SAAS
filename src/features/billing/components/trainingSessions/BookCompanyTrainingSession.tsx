import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { Moment } from "moment";
import { useCreateTrainingBooking } from "features/billing/hooks/addOns/trainingSession/booking/useCreateTrainingBooking";
import { QUERY_KEY_FOR_TRAINING_SESSION_BOOKINGS } from "features/billing/hooks/addOns/trainingSession/booking/useGetTrainingBookings";

type FormProps = {
  duration: [Moment, Moment];
  title: string;
};
export const BookCompanyTrainingSession: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<FormProps>();
  const { mutate, isLoading } = useCreateTrainingBooking();

  const handleSubmit = (data: FormProps) => {
    mutate(
      {
        endDate: data?.duration[1]?.toISOString(),
        startDate: data?.duration[0]?.toISOString(),
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
            // duration: 0.4,
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TRAINING_SESSION_BOOKINGS],
            // exact: true,
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
      title={"Book Training Session"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="title" label="Title" rules={textInputValidationRules}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange]}
        >
          <DatePicker.RangePicker
            placeholder={["Start Time", "End Time"]}
            showTime
            className="w-full"
          />
        </Form.Item>

        <div className="flex justify-between">
          <AppButton
            type="button"
            variant="transparent"
            handleClick={() => handleClose()}
            disabled={isLoading}
            label="Cancel"
          />
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
