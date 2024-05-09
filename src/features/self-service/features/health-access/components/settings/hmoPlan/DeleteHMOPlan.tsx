import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeleteHMOPlan } from "../../../hooks/hmoPlan/useDeleteHMOPlan";
import { THMOPlan } from "../../../types/hmoPlan";
import { QUERY_KEY_FOR_HMO_PLANS } from "../../../hooks/hmoPlan/useGetHMOPlans";

interface IProps extends IModalProps {
  plan?: THMOPlan;
}
export const DeleteHMOPlan: React.FC<IProps> = ({
  open,
  handleClose,
  plan,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteHMOPlan();
  const handleDelete = () => {
    if (!plan) return;
    mutate(
      {
        id: plan.id,
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
            queryKey: [QUERY_KEY_FOR_HMO_PLANS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete HMO Plan"
      entity={{
        type: "hmo plan",
        name: plan?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
