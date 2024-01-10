import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import UserSelectionContainer from "../components/subscription/userSelection/UserSelectionContainer";

const PurchaseEmployeeLicenses = () => {
  const navigate = useNavigate();
  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useGetCompanyActiveSubscription();
  const unableToPurchaseUserLicense = !subscription || !subscription?.isActive;
  return (
    <>
      {unableToPurchaseUserLicense && (
        <Navigate to={appRoutes.billingSubscription} replace={true} />
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
            <div className="Container space-y-8 lg:space-y-16">
              <PageIntro
                title="Purchase User Licenses"
                link={appRoutes.settings}
                actions={[
                  {
                    name: "Billing Summary",
                    handleClick: () => navigate(appRoutes.billingSummary),
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
