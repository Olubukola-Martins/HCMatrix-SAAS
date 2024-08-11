import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Segmented, Skeleton } from "antd";
import { CreateCompanySubscriptionContextProvider } from "../stateManagers";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import UpgradePlanContainer from "../components/subscription/UpgradePlanContainer";

const UpgradePlanPage = () => {
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
                  title="Upgrade Plan"
                  link={appRoutes.settings}
                  comps={[
                    <Segmented
                      options={["usd", "ngn"].map((item) => ({
                        label: <span className="uppercase">{item}</span>,
                        value: item,
                      }))}
                      size="large"
                    />,
                  ]}
                />

                <UpgradePlanContainer subscription={subscription} />
              </div>
            </CreateCompanySubscriptionContextProvider>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default UpgradePlanPage;
