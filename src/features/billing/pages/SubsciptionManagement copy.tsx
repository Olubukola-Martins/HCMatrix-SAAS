import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Skeleton } from "antd";
import { CreateCompanySubscriptionContextProvider } from "../stateManagers";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import SubscriptionContainer from "../components/subscription/SubscriptionContainer";

const SubsciptionManagement = () => {
  const navigate = useNavigate();
  const { data: subscription, isLoading, isError, error } = useGetCompanyActiveSubscription();
  return (
    <>
      <ErrorBoundary>
        <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
          <ErrorWrapper isError={isError} message={error?.response?.data?.message ?? error?.response?.data?.error?.message}>
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
