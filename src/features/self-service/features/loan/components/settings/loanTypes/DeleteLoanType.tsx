import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useDeleteLoanType } from "../../../hooks/type/useDeleteLoanType";
import { QUERY_KEY_FOR_LOAN_TYPES } from "../../../hooks/type/useGetLoanTypes";

export const DeleteLoanType: React.FC<IModalProps> = ({
  open,
  handleClose,
  id,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLoanType();

  const handleDelete = () => {
    if (!id) return;
    mutate(
      { id },
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
            queryKey: [QUERY_KEY_FOR_LOAN_TYPES],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };

  return (
    <ConfirmationModal
      title="Delete loan type"
      description={`Are you sure you want to delete this loan type ?`}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
