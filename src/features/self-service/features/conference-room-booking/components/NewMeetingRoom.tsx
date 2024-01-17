import { Form, Input, Modal } from "antd";
import Themes from "components/Themes";
import React from "react";
import { useQueryClient } from "react-query";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateConferenceRoom } from "../hooks/useCreateConferenceRoom";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOMS } from "../hooks/useFetchAllConferenceRooms";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_AVAILABLE_CONFERENCE_ROOMS } from "../hooks/useFetchAllAvailableConferenceRooms";
import { IModalProps } from "types";
import { QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS } from "../hooks/useGetConferenceRoomAnalytics";

const NewMeetingRoom: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateConferenceRoom();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
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
            queryKey: [QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_CONFERENCE_ROOMS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AVAILABLE_CONFERENCE_ROOMS],
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
      title={"Add Conference Room"}
      style={{ top: 20 }}
    >
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name={"name"}
          rules={textInputValidationRules}
          label="Meeting Room Name"
        >
          <Input placeholder="Room name" />
        </Form.Item>
        <Themes>
          <div className="flex justify-end">
            <div className="flex gap-3">
              <AppButton type="submit" label="Submit" isLoading={isLoading} />
            </div>
          </div>
        </Themes>
      </Form>
    </Modal>
  );
};

export default NewMeetingRoom;
