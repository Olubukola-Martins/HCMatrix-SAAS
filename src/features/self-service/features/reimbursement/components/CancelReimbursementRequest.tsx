import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useCancelRequisition } from "../../requisitions/hooks/useCancelRequisition";
import { QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS } from "../../requisitions/hooks/reimbursement/useGetReimbursementRequisitions";
import { QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/reimbursement/useGetReimburements4AuthEmployee";
import { TReimbursementRequisition } from "../../requisitions/types/reimbursement";

interface IProps extends IModalProps {
  data?: TReimbursementRequisition;
}
export const CancelReimbursementRequest: React.FC<IProps> = ({
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
        type: "reimbursement",
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
            queryKey: [QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS_FOR_AUTH_EMPLOYEE,
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
      title="Cancel Reimbursement request"
      entity={{
        type: `reimbursement request`,
        name: `${data?.title}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
