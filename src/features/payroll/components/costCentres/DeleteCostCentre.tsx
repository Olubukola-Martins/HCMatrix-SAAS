import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TCostCentre } from "features/payroll/types";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeleteCostCentre } from "features/payroll/hooks/costCentres/useDeleteCostCentre";
import { QUERY_KEY_FOR_COST_CENTRES } from "features/payroll/hooks/costCentres/useGetCostCentres";

interface IProps extends IModalProps {
  costCentre: TCostCentre;
}
export const DeleteCostCentre: React.FC<IProps> = ({
  open,
  handleClose,
  costCentre,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteCostCentre();

  const handleDelete = () => {
    mutate(
      {
        id: costCentre.id,
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
            queryKey: [QUERY_KEY_FOR_COST_CENTRES],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Cost Centre"
      entity={{ type: "cost centre", name: costCentre.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
