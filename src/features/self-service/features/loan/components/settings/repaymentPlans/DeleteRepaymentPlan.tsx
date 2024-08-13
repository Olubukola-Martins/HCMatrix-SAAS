import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { QUERY_KEY_FOR_LOAN_TYPES } from "../../../hooks/type/useGetLoanTypes";
import { useDeleteLoanPaymentPlan } from "../../../hooks/paymentPlan/useDeletePaymentPlan";

export const DeleteRepaymentPlan: React.FC<IModalProps> = ({
  open,
  handleClose,
  id,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLoanPaymentPlan();

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
      title="Delete loan repayment plan"
      description={`Are you sure you want to delete this loan repayment plan ?`}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
