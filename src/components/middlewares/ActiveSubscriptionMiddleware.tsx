import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
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
  const { data, isLoading, isError, error } = useGetCompanyActiveSubscription();
  const isCompanySubscriptionActive = !!data === true;
  return (
    <>
      <Skeleton active loading={isLoading} paragraph={{ rows: 10 }}>
        <ErrorWrapper
          isError={isError}
          backLink={appRoutes.home}
          message={
            error?.response.data.message ?? error?.response.data.error.message
          }
        >
          <>
            {!isCompanySubscriptionActive && isOwner ? (
              <Navigate
                to={appRoutes.billingInactiveSubscriptionInformOwner}
                replace={true}
              />
            ) : null}
            {!isCompanySubscriptionActive && !isOwner ? (
              <Navigate
                to={appRoutes.billingInactiveSubscriptionInformEmployee}
                replace={true}
              />
            ) : null}
            {isCompanySubscriptionActive ? <>{children}</> : null}
          </>
        </ErrorWrapper>
      </Skeleton>
    </>
  );
};

export default ActiveSubscriptionMiddleware;
