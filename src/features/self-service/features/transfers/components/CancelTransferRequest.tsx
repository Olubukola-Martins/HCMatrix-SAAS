import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TTransferRequisition } from "../../requisitions/types/transfer";
import { QUERY_KEY_FOR_TRANSFER_REQUISITIONS } from "../../requisitions/hooks/transfer/useGetTransferRequisitions";
import { QUERY_KEY_FOR_TRANSFER_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/transfer/useGetTransferRequisitions4AuthEmployee";
import { useCancelRequisition } from "../../requisitions/hooks/useCancelRequisition";

interface IProps extends IModalProps {
  data?: TTransferRequisition;
}
export const CancelTransferRequest: React.FC<IProps> = ({
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
        type: "transfer",
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
            queryKey: [QUERY_KEY_FOR_TRANSFER_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TRANSFER_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Transfer request"
      entity={{
        type: `transfer request`,
        name: `${data?.proposedDesignation.name}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
