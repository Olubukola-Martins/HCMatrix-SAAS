import {
  Button as AntBtn,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import Themes from "components/Themes";
import { useApiAuth } from "hooks/useApiAuth";
import { useQueryClient } from "react-query";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateConferenceRoomBooking } from "../hooks/useCreateConferenceRoomBooking";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS } from "../hooks/useFetchAllConferenceRoomBookings";
import { FormMeetingRoomsInput } from "./FormMeetingRoomsInput";
import { PRIORITIES } from "constants/general";
import { AppButton } from "components/button/AppButton";

interface IProps {
  handleClose: Function;
}

const NewCRBBooking = ({ handleClose }: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateConferenceRoomBooking();
  const { currentUserEmployeeId } = useApiAuth();

  const handleSubmit = (data: any) => {
    mutate(
      {
        conferenceRoomId: data.roomId,
        date: data.date.toString(),
        employeeId: currentUserEmployeeId,
        endTime: data.duration[0].toString(),
        startTime: data.duration[1].toString(),
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
        },
      }
    );
  };
  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        onFinish={handleSubmit}
        form={form}
      >
        <FormMeetingRoomsInput
          Form={Form}
          control={{ label: "Meeting Room", name: "roomId" }}
        />
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Meeting Date is required!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: "Duration is required!" }]}
        >
          <TimePicker.RangePicker className="w-full" use12Hours />
        </Form.Item>
        <Form.Item name="reason" rules={textInputValidationRules}>
          <Input placeholder="Reason" />
        </Form.Item>
        <Form.Item name={"priority"} rules={generalValidationRules}>
          <Select placeholder="Priority" options={PRIORITIES} />
        </Form.Item>
        <Themes>
          <div className="flex justify-between items-center">
            <AntBtn type="text" onClick={() => handleClose()}>
              Cancel
            </AntBtn>
            <div className="flex gap-3">
              {/* <button className="transparentButton">
                Save And Add Another
              </button> */}
              <AntBtn type="ghost">Save And Add Another</AntBtn>
              <AppButton type="submit" label="Submit" isLoading={isLoading} />
            </div>
          </div>
        </Themes>
      </Form>
    </div>
  );
};

export default NewCRBBooking;
