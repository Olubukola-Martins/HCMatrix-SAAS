import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useCancelRequisition } from "../../requisitions/hooks/useCancelRequisition";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { TPromotionRequisition } from "../../requisitions/types/promotion";

interface IProps extends IModalProps {
  data?: TPromotionRequisition;
}
export const CancelPromotionRequest: React.FC<IProps> = ({
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
        type: "promotion",
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
            queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Profile Edit request"
      entity={{
        type: `profile edit request`,
        name: `${data?.proposedDesignation.name}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
