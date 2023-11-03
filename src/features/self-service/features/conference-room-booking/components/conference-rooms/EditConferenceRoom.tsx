import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS } from "../../hooks/useGetConferenceRoomAnalytics";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOMS } from "../../hooks/useFetchAllConferenceRooms";
import { QUERY_KEY_FOR_AVAILABLE_CONFERENCE_ROOMS } from "../../hooks/useFetchAllAvailableConferenceRooms";
import { useEditConferenceRoom } from "../../hooks/useEditConferenceRoom";
import { TSingleConferenceRoom } from "../../types";

interface IProps extends IModalProps {
  room?: Pick<TSingleConferenceRoom, "id" | "name">;
}

export const EditConferenceRoom: React.FC<IProps> = ({
  open,
  handleClose,
  room,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useEditConferenceRoom();

  const handleSubmit = (data: any) => {
    if (!room) return;
    mutate(
      {
        id: room.id,
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

  useEffect(() => {
    form.setFieldsValue({
      name: room?.name,
    });
  }, [form, room]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Conference Room"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
