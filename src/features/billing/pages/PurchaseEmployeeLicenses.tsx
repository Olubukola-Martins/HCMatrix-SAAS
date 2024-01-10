import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import UserSelectionContainer from "../components/subscription/userSelection/UserSelectionContainer";
import { CancelSubscription } from "../components/subscription/CancelSubscription";

const PurchaseEmployeeLicenses = () => {
  const navigate = useNavigate();
  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useGetCompanyActiveSubscription();
  const unableToPurchaseUserLicense = !subscription || !subscription?.isActive;
  const [action, setAction] = useState<"cancel-subscription">();
  return (
    <>
      {unableToPurchaseUserLicense && (
        <Navigate to={appRoutes.billingSubscription} replace={true} />
      )}
      <CancelSubscription
        handleClose={() => setAction(undefined)}
        open={action === "cancel-subscription"}
      />
      <ErrorBoundary>
        <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
          <ErrorWrapper
            isError={isError}
            message={
              error?.response?.data?.message ??
              error?.response?.data?.error?.message
            }
          >
            <div className="Container space-y-8 lg:space-y-16">
              <PageIntro
                title="Purchase User Licenses"
                link={appRoutes.settings}
                actions={[
                  {
                    name: "Billing Summary",
                    handleClick: () => navigate(appRoutes.billingSummary),
                  },
                  {
                    name: "Cancel Subscription",
                    handleClick: () => setAction("cancel-subscription"),
                    btnVariant: "transparent",
                  },
                ]}
              />

              <UserSelectionContainer />
            </div>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default PurchaseEmployeeLicenses;
