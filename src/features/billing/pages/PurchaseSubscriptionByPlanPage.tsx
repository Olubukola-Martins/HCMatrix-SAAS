import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Segmented, Skeleton } from "antd";
import { CreateCompanySubscriptionContextProvider } from "../stateManagers";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { useGetGetSubscriptionPlanById } from "../hooks/plan/useGetGetSubscriptionPlanById";
import { useParams } from "react-router-dom";
import PurchaseSubscriptionPlan from "../components/plan/PurchaseSubcsriptionPlan";

const PurchaseSubscriptionByPlanPage = () => {
  const params = useParams();
  const id = params.id as string;
  const {
    data: plan,
    isLoading,
    isError,
    error,
  } = useGetGetSubscriptionPlanById({
    id: +id,
  });
  return (
    <>
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
                  title="Purchase Plan"
                  link={appRoutes.settings}
                  comps={[
                    <Segmented
                      options={["USD", "NGN"].map((item) => ({
                        label: <span className="uppercase">{item}</span>,
                        value: item,
                      }))}
                      size="large"
                    />,
                  ]}
                />

                <PurchaseSubscriptionPlan plan={plan} />
              </div>
            </CreateCompanySubscriptionContextProvider>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default PurchaseSubscriptionByPlanPage;
