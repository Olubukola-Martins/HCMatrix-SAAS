import { DatePicker, Form, Input, InputNumber, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { useFetchSingleVehicleBooking } from "../hooks/useFetchSingleVehicleBooking";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

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
  const { data, isSuccess, isFetching } = useFetchSingleVehicleBooking({
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
        status: data.status,
        vehicle: `${data.vehicle.brand} ${data.vehicle.type} (${data.vehicle.plateNumber}),`,
      });
    }
  }, [isSuccess, data, form]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"View Vehicle Booking"}
      style={{ top: 10 }}
    >
      <Skeleton loading={isFetching} active paragraph={{ rows: 12 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
          <Form.Item
            name="date"
            rules={generalValidationRules}
            label="Booking Date"
          >
            <DatePicker placeholder="Booking Date" className="w-full" />
          </Form.Item>
          <Form.Item
            name="vehicle"
            rules={generalValidationRules}
            label="Vehicle"
          >
            <Input placeholder="Vehicle" className="w-full" />
          </Form.Item>

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

          <Form.Item name={"status"} label="Status">
            <Input
              className="capitalize"
              style={{
                color: getAppropriateColorForStatus(data?.status ?? ""),
              }}
            />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};
