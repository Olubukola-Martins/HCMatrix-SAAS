import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { useCancelCompanySubscription } from "features/billing/hooks/company/useCancelCompanySubscription";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

interface IProps extends IModalProps {}
export const CancelSubscription: React.FC<IProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelCompanySubscription();

  const handleDelete = () => {
    mutate(undefined, {
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
    <DeleteEntityModal
      title="Cancel Subscription"
      entity={{ type: "subscription", name: "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
