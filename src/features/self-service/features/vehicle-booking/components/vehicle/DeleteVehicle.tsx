import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_VEHICLES, TVehicle } from "../../hooks/useFetchVehicles";
import useDeleteVehicle from "../../hooks/useDeleteVehicle";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { generateVehicleName } from "../../utils/generateVehicleName";

interface IProps extends IModalProps {
  vehicle?: TVehicle;
}
export const DeleteVehicle: React.FC<IProps> = ({
  open,
  handleClose,
  vehicle,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteVehicle();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (!vehicle) return;
    mutate(
      {
        id: vehicle.id,
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
            queryKey: [QUERY_KEY_FOR_VEHICLES],
            // exact: true,
          });

          handleClose();
          navigate(appRoutes.vehicleBooking);
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Vehicle"
      entity={{
        type: "vehicle",
        name: generateVehicleName(vehicle), //TODO: Replace all Manual instances of generating vehicle name
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
