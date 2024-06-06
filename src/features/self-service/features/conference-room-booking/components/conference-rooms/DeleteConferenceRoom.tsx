import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeleteConferenceRoom } from "../../hooks/useDeleteConferenceRoom";
import { TSingleConferenceRoom } from "../../types";
import { QUERY_KEY_FOR_AVAILABLE_CONFERENCE_ROOMS } from "../../hooks/useFetchAllAvailableConferenceRooms";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOMS } from "../../hooks/useFetchAllConferenceRooms";
import { QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS } from "../../hooks/useGetConferenceRoomAnalytics";

interface IProps extends IModalProps {
  room?: Pick<TSingleConferenceRoom, "id" | "name">;
}
export const DeleteConferenceRoom: React.FC<IProps> = ({
  open,
  handleClose,
  room,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteConferenceRoom();

  const handleDelete = () => {
    if (!room) return;
    mutate(
      {
        id: room.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
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
          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Conference Room"
      entity={{ type: "room", name: room?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
