import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { TVehicleInUse } from "../types";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE } from "../hooks/useGetVehicleEmployeeBookingAnalytics";
import { generateVehicleName } from "../utils/generateVehicleName";

interface IProps extends IModalProps {
  data?: TVehicleInUse;
}
export const ReturnVehicle: React.FC<IProps> = ({
  data,
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useEditVehicle();

  const handleReturnVehicle = () => {
    if (data) {
      mutate(
        {
          data: {
            type: data?.type,
            brand: data?.brand,
            model: data?.model,
            plateNumber: data?.plateNumber,
            color: data?.color,
            description: data?.description,
            purchaseDate: data?.purchaseDate,
            dateAssigned: null,
            cost: +data?.cost,
            status: "unassigned",
            assigneeId: null,
          },
          id: data.id,
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

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE],
              // exact: true,
            });
            handleClose();
          },
        }
      );
    }
  };

  return (
    <ConfirmationModal
      title="Return Vehicle"
      description={`Are you sure you want to return ${generateVehicleName(
        data
      )}?`}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleReturnVehicle, isLoading: isLoading }}
    />
  );
};
