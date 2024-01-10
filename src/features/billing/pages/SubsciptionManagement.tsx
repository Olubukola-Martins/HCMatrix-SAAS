import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React from "react";
import SubscriptionContainer from "../components/subscription/SubscriptionContainer";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { CreateCompanySubscriptionContextProvider } from "../stateManagers";

const SubsciptionManagement = () => {
  const navigate = useNavigate();
  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useGetCompanyActiveSubscription();
  return (
    <>
      {subscription && subscription.isActive && (
        <Navigate to={appRoutes.purchaseUserLicense} replace={true} />
      )}
      <ErrorBoundary>
        <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
          <ErrorWrapper
            isError={isError}
            message={
              error?.response?.data?.message ??
              error?.response?.data?.error?.message
            }
          >
            <CreateCompanySubscriptionContextProvider>
              <div className="Container space-y-8 lg:space-y-16">
                <PageIntro
                  title="Subscription"
                  link={appRoutes.settings}
                  actions={[
                    {
                      name: "Billing Summary",
                      handleClick: () => navigate(appRoutes.billingSummary),
                    },
                    {
                      name: "Purchase User License",
                      handleClick: () =>
                        navigate(appRoutes.purchaseUserLicense),
                      btnVariant: "transparent",
                    },
                  ]}
                />

                <SubscriptionContainer subscription={subscription} />
              </div>
            </CreateCompanySubscriptionContextProvider>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default SubsciptionManagement;
