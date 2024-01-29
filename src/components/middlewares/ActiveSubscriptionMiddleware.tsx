import { Skeleton } from "antd";
import { appRoutes } from "config/router/paths";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import React from "react";
import { Navigate } from "react-router-dom";

type TProps = {
  children: React.ReactNode;
  isOwner: boolean;
};
const ActiveSubscriptionMiddleware: React.FC<TProps> = ({
  children,
  isOwner,
}) => {
  const { data, isLoading } = useGetCompanyActiveSubscription();
  const isCompanySubscriptionActive = !!data === true;
  return (
    <>
      <Skeleton active loading={isLoading} paragraph={{ rows: 10 }}>
        {!isCompanySubscriptionActive && isOwner ? (
          <Navigate to={appRoutes.billingSubscription} replace={true} />
        ) : null}
        {!isCompanySubscriptionActive && !isOwner ? (
          <Navigate
            to={appRoutes.billingInactiveSubscriptionInformEmployee}
            replace={true}
          />
        ) : null}
        {isCompanySubscriptionActive ? <>{children}</> : null}
      </Skeleton>
    </>
  );
};

export default ActiveSubscriptionMiddleware;
