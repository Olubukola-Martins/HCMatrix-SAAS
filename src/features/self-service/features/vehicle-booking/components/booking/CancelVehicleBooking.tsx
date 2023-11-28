import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import {
  QUERY_KEY_FOR_VEHICLE_BOOKINGS,
  TVehicleBooking,
} from "../../hooks/useFetchVehicleBookings";
import { generateVehicleName } from "../../utils/generateVehicleName";
import { useCancelVehicleBooking } from "../../hooks/booking/useCancelVehicleBooking";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../../hooks/booking/useGetVehicleBookings4AuthEmployee";

interface IProps extends IModalProps {
  data?: TVehicleBooking;
}
export const CancelVehicleBooking: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelVehicleBooking();

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
            queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Vehicle Booking"
      entity={{
        type: `vehicle booking`,
        name: `${generateVehicleName(data?.vehicle)}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
