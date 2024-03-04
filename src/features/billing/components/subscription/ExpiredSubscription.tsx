import React from "react";
import { IModalProps } from "types";
import ConfirmationModal from "components/modals/ConfirmationModal";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

interface IProps extends IModalProps {}
export const ExpiredSubscription: React.FC<IProps> = ({
  open,
  handleClose,
}) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(appRoutes.billingSubscription, { replace: true });
  };
  const { user, isLoading } = useMostRecentApiAuth();

  return (
    <ConfirmationModal
      title="Expired Subscription"
      handleClose={handleClose}
      description={`Hello ${user?.fullName},
      Your subscription has ended
     Please do well to renew your subscription.
     Thank you!`}
      hideImage={true}
      open={open}
      loading={isLoading}
      handleConfirm={{ fn: handleConfirm, text: "Renew Subscription" }}
    />
  );
};
