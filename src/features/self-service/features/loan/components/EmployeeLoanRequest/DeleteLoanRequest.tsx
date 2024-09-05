import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../../hooks/requests/useGetLoanRequests";
import { useDeleteLoanRequest } from "../../hooks/requests/useDeleteLoanRequest";

export const DeleteLoanRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
  id,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLoanRequest();

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
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
          });
          handleClose();
        },
      }
    );
  };

  return (
    <ConfirmationModal
      title="Delete loan request"
      description={`Are you sure you want to delete this loan request ?`}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
