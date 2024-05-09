import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TLoan } from "../types";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../hooks/requests/useGetLoanRequests";
import { useCancelLoan } from "../hooks/useCancelLoan";

interface IProps extends IModalProps {
  data?: TLoan;
}
export const CancelLoan: React.FC<IProps> = ({ open, handleClose, data }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelLoan();

  const handleDelete = () => {
    if (!data) return;
    mutate(
      {
        id: data.id,
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
            queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Loan"
      entity={{
        type: `loan request`,
        name: `${data?.title}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
