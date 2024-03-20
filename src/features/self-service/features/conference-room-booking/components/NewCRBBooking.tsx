import { DatePicker, Form, Input, Modal, Select, TimePicker } from "antd";
import Themes from "components/Themes";
import { useQueryClient } from "react-query";
import {
  textInputValidationRules,
  generalValidationRules,
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateConferenceRoomBooking } from "../hooks/useCreateConferenceRoomBooking";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS } from "../hooks/useFetchAllConferenceRoomBookings";
import { FormMeetingRoomsInput } from "./FormMeetingRoomsInput";
import { PRIORITIES } from "constants/general";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import { QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../hooks/useGetConferenceRoomBookings4AuthEmployee";
import { Moment } from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

const NewCRBBooking: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateConferenceRoomBooking();

  const handleSubmit = (data: any) => {
    mutate(
      {
        conferenceRoomId: data.roomId,
        date: data.date.toString(),
        endTime: `${(data.date as Moment).format(DEFAULT_DATE_FORMAT)} ${(
          data.duration[1] as Moment
        ).format("h:mm:ss a")}`,
        startTime: `${(data.date as Moment).format(DEFAULT_DATE_FORMAT)} ${(
          data.duration[0] as Moment
        ).format("h:mm:ss a")}`,
        priority: data.priority,
        reason: data.reason,
        departmentId: data.departmentId,
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
            queryKey: [QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE,
            ],
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
      title={"New Conference Room Booking"}
      style={{ top: 20 }}
    >
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        onFinish={handleSubmit}
        form={form}
      >
        <FormMeetingRoomsInput
          Form={Form}
          control={{ label: "", name: "roomId" }}
        />
        <Form.Item
          name="date"
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: "Duration is required!" }]}
        >
          <TimePicker.RangePicker className="w-full" use12Hours />
        </Form.Item>
        <Form.Item name={"priority"} rules={generalValidationRules}>
          <Select placeholder="Priority" options={PRIORITIES} />
        </Form.Item>
        <Form.Item name="reason" rules={textInputValidationRules}>
          <Input.TextArea placeholder="Reason" />
        </Form.Item>

        <Themes>
          <div className="flex justify-end">
            <AppButton type="submit" label="Submit" isLoading={isLoading} />
          </div>
        </Themes>
      </Form>
    </Modal>
  );
};

export default NewCRBBooking;
