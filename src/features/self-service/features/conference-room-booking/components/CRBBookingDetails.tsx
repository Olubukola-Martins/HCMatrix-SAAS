import { DatePicker, Form, Input, Select, Skeleton, TimePicker } from "antd";
import React, { useEffect } from "react";
import { useFetchSingleConferenceRoomBooking } from "../hooks/useFetchSingleConferenceRoomBooking";
import moment from "moment";
import { AppButton } from "components/button/AppButton";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";

interface IProps {
  id: number;
}

const CRBBookingDetails = ({ id }: IProps) => {
  const [form] = Form.useForm();
  const { data, isFetching } = useFetchSingleConferenceRoomBooking({ id });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? moment(data.date) : null,
        bookedBy: `${data.employee.firstName} ${data.employee.lastName}`,
        employeeID: data.employee.empUid,
        department: data.department?.name,
        roomName: data.conferenceRoom.name,
        priority: data.priority,
        reason: data.reason,
        duration: [moment(data.startTime), moment(data.endTime)],
      });
    }
  }, [id, form, data]);
  return (
    <Skeleton loading={isFetching} active paragraph={{ rows: 16 }}>
      <Form labelCol={{ span: 24 }} requiredMark={false} form={form}>
        <Form.Item name="date" label="Booking Date">
          <DatePicker className="w-full" placeholder="Meeting Date" disabled />
        </Form.Item>
        <Form.Item name={"bookedBy"} label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name={"employeeID"} label="Employee ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name={"department"} label="Department">
          <Input disabled />
        </Form.Item>
        <Form.Item name={"roomName"} label="Conference Room Name">
          <Input disabled />
        </Form.Item>

        <Form.Item name="duration" label="Meeting Duration">
          <TimePicker.RangePicker className="w-full" use12Hours disabled />
        </Form.Item>
        <Form.Item name="reason" label="Reason">
          <Input placeholder="Reason" disabled />
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Input placeholder="Priority" disabled />
        </Form.Item>

        <Form.Item name={"status"} label="Status">
          <Select
            placeholder="status"
            options={APPROVAL_STATUS_OPTIONS.filter(
              (item) => item.value !== "pending"
            )}
          />
        </Form.Item>
        <div className="flex justify-end gap-2">
          {<AppButton label="Download" variant="transparent" type="button" />}

          {data?.status === "pending" && (
            <AppButton label="Approve/Reject" type="submit" />
          )}
        </div>
      </Form>
    </Skeleton>
  );
};

export default CRBBookingDetails;
