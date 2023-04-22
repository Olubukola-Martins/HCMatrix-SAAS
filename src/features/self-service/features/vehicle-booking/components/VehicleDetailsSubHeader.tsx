import React, { useState } from "react";
import useDeleteVehicle from "../hooks/useDeleteVehicle";
import { useQueryClient } from "react-query";
import { TVehicle } from "../hooks/useFetchVehicles";
import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";
import { EditSingleVehicle } from "./EditSingleVehicle";
import PageSubHeader from "components/layout/PageSubHeader";
import { openNotification } from "utils/notifications";

export const VehicleDetailsSubHeader: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteVehicle();

  const deleteVehicle = () => {
    mutate(
      {
        id: vehicle.id,
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
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_VEHICLE],
          });
        },
      }
    );
  };
  const [showE, setShowE] = useState(false);

  return (
    <div>
      <EditSingleVehicle
        vehicle={vehicle}
        handleClose={() => setShowE(false)}
        open={showE}
      />

      <PageSubHeader
        description={{ content: vehicle.brand, className: "text-lg" }}
        hideBackground
        actions={[
          {
            name: "Edit",
            handleClick: () => {
              setShowE(true);
            },
          },
          {
            name: "Delete",
            handleClick: deleteVehicle,
            btnVariant: "transparent",
            loading: isLoading,
          },
        ]}
      />
    </div>
  );
};
