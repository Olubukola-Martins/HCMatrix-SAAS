import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TSingleConferenceRoomBooking } from "../../types";
import { useCancelConferenceRoomBooking } from "../../hooks/useCancelConferenceRoomBooking";
import { QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../../hooks/useGetConferenceRoomBookings4AuthEmployee";
import { QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS } from "../../hooks/useFetchAllConferenceRoomBookings";

interface IProps extends IModalProps {
  data?: TSingleConferenceRoomBooking;
}
export const CancelCRBBooking: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelConferenceRoomBooking();

  const handleDelete = () => {
    if (!data) return;
    mutate(
      {
        id: data.id,
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
            queryKey: [
              QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE,
            ],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Conference Room Booking"
      entity={{
        type: `conference room booking`,
        name: `${data?.conferenceRoom.name}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
