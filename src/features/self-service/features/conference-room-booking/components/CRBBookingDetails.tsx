import { DatePicker, Form, Input, Modal, Skeleton, TimePicker } from "antd";
import { useEffect } from "react";
import { useFetchSingleConferenceRoomBooking } from "../hooks/useFetchSingleConferenceRoomBooking";
import dayjs from "dayjs";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { IModalProps } from "types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS } from "../hooks/useFetchAllConferenceRoomBookings";
import { QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../hooks/useGetConferenceRoomBookings4AuthEmployee";
import { QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS } from "../hooks/useGetConferenceRoomAnalytics";
import { QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS } from "features/self-service/hooks/useGetSelfServiceDashboardAnalytics";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}
const CRBBookingDetails = ({
  id,
  handleClose,
  open,
  approvalRequest,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { data, isFetching } = useFetchSingleConferenceRoomBooking({ id });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? dayjs(data.date) : null,
        bookedBy: `${getEmployeeFullName(data.employee)}`,
        employeeID: data.employee.empUid,
        roomName: data.conferenceRoom.name,
        priority: data.priority,
        reason: data.reason,
        status: data.status,
        duration: [dayjs(data.startTime), dayjs(data.endTime)],
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"View Conference Room Booking"}
      style={{ top: 10 }}
    >
      <Skeleton loading={isFetching} active paragraph={{ rows: 16 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [
                QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE,
              ],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS, id],
              // exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS],
              // exact: true,
            });
            handleClose();
          }}
        />
        <Form labelCol={{ span: 24 }} requiredMark={false} form={form} disabled>
          <Form.Item name="date" label="Booking Date">
            <DatePicker className="w-full" placeholder="Meeting Date" />
          </Form.Item>
          <Form.Item name={"bookedBy"} label="Name">
            <Input />
          </Form.Item>
          <Form.Item name={"employeeID"} label="Employee ID">
            <Input />
          </Form.Item>

          <Form.Item name={"roomName"} label="Conference Room">
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Meeting Duration">
            <TimePicker.RangePicker className="w-full" use12Hours />
          </Form.Item>
          <Form.Item name="reason" label="Reason">
            <Input placeholder="Reason" />
          </Form.Item>
          <Form.Item name="priority" label="Priority">
            <Input placeholder="Priority" />
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

export default CRBBookingDetails;
