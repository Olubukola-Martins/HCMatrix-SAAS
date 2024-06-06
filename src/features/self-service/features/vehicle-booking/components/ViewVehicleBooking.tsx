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
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS } from "../hooks/useFetchVehicleBookings";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../hooks/booking/useGetVehicleBookings4AuthEmployee";
import { QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE } from "../hooks/useGetVehicleEmployeeBookingAnalytics";
import { QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS } from "features/self-service/hooks/useGetSelfServiceDashboardAnalytics";

interface IProps extends IModalProps {
  bookingId: number;
  approvalRequest?: TApprovalRequest;
}

export const ViewVehicleBooking: React.FC<IProps> = ({
  handleClose,
  open,
  bookingId,
  approvalRequest,
}) => {
  const queryClient = useQueryClient();

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
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [
                QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE,
                bookingId,
              ],
              // exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS],
              // exact: true,
            });
            handleClose();
          }}
        />

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
