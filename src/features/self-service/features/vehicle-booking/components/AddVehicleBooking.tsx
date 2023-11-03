import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  numberInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import { useCreateVehicleBooking } from "../hooks/useCreateVehicleBooking";
import { FormVehicleInput } from "./FormVehicleInput";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS } from "../hooks/useFetchVehicleBookings";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../hooks/booking/useGetVehicleBookings4AuthEmployee";

interface IProps extends IModalProps {}

export const AddVehicleBooking: React.FC<IProps> = ({ handleClose, open }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateVehicleBooking();

  const handleSubmit = (data: any) => {
    mutate(
      {
        date: data.date.toString(),

        destination: data.destination,
        duration: data.duration,
        vehicleId: data.vehicleId,
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
            queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE],
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
      title={"Add Vehicle Booking"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="date"
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          label="Booking Date"
        >
          <DatePicker placeholder="Booking Date" className="w-full" />
        </Form.Item>
        <FormVehicleInput Form={Form} />
        <Form.Item
          label="Duration(hrs)"
          name="duration"
          rules={[...numberInputValidationRules]}
        >
          <InputNumber placeholder="duration" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Destination"
          name="destination"
          rules={textInputValidationRules}
        >
          <Input.TextArea placeholder="destination" />
        </Form.Item>

        <AppButton isLoading={isLoading} type="submit" />
      </Form>
    </Modal>
  );
};
