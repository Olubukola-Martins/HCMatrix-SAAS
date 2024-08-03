import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useCancelShiftSwapRequest } from "../hooks/useCancelShiftSwapRequest";
import { TShiftSwapRequest } from "../types";

interface IProps extends IModalProps {
  data?: Pick<TShiftSwapRequest, "id">;
}
export const CancelShiftSwapRequest: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelShiftSwapRequest();

  const handleDelete = () => {
    if (!data) return;
    mutate(data?.id, {
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
          queryKey: [QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION],
          // exact: true,
        });
        navigate(appRoutes.billingSubscription);
        handleClose();
      },
    });
  };

  return (
    <ConfirmationModal
      title="Cancel Swap Request"
      description={`Are you sure you want to cancel your swap request?`}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
