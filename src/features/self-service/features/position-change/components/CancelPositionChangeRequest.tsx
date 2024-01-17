import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useCancelRequisition } from "../../requisitions/hooks/useCancelRequisition";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions4AuthEmployee";
import { TPositionChangeRequisition } from "../../requisitions/types/positionChange";

interface IProps extends IModalProps {
  data?: TPositionChangeRequisition;
}
export const CancelPositionChangeRequest: React.FC<IProps> = ({
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
        type: "position-change",
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
            queryKey: [QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE,
            ],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Position Change request"
      entity={{
        type: `position change request`,
        name: `${data?.proposedDesignation.name}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
