import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useCancelRequisition } from "../../requisitions/hooks/useCancelRequisition";
import { TMoneyRequisition } from "../../requisitions/types/money";
import { QUERY_KEY_FOR_MONEY_REQUISITIONS } from "../../requisitions/hooks/money/useGetMoneyRequisitions";
import { QUERY_KEY_FOR_MONEY_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/money/useGetMoneyRequisitions4AuthEmployee";

interface IProps extends IModalProps {
  data?: TMoneyRequisition;
}
export const CancelMoneyRequest: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelRequisition();

  const handleDelete = () => {
    if (!data) return;
    mutate(
      {
        entityId: data.id,
        type: "money",
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
            queryKey: [QUERY_KEY_FOR_MONEY_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_MONEY_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Monetary request"
      entity={{
        type: `monetary request`,
        name: `${data?.title}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
