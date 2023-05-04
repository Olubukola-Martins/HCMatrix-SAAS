import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { FormVehicleInput } from "./FormVehicleInput";
import { useFetchSingleVehicleBooking } from "../hooks/useFetchSingleVehicleBooking";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";

interface IProps extends IModalProps {
  bookingId: number;
}

export const ViewVehicleBooking: React.FC<IProps> = ({
  handleClose,
  open,
  bookingId,
}) => {
  const { token, companyId } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isSuccess } = useFetchSingleVehicleBooking({
    companyId,
    token,
    id: bookingId,
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        date: moment(data.date),
        employeeId: data.employeeId,
        destination: data.destination,
        duration: data.duration,
        vehicleId: data.vehicleId,
      });
    }
  }, [isSuccess, data, form]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"View Vehicle Booking"}
      style={{ top: 20 }}
    >
      <Form layout="vertical" requiredMark={false} form={form} disabled>
        <Form.Item
          name="date"
          rules={generalValidationRules}
          label="Booking Date"
        >
          <DatePicker placeholder="Booking Date" className="w-full" />
        </Form.Item>
        <FormVehicleInput Form={Form} />
        {/* TO DO: This needs to be  from retrieved vehicle data, as they will be an issue if pagination of FormVehicleInput doesnt include selected vehicle */}

        <Form.Item
          label="Duration(hrs)"
          name="duration"
          rules={generalValidationRules}
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
      </Form>
    </Modal>
  );
};
