import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Segmented, Skeleton } from "antd";
import { CreateCompanySubscriptionContextProvider } from "../stateManagers";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PurchaseModulesContainer from "../components/subscription/PurchaseModulesContainer";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { TBillingCycle } from "../types/billingCycle";
import { TCompanySubscription } from "../types/company/companySubscription";
import { TSubscriptionPriceType } from "../types/priceType";

const PurchaseSubscriptionByPlanPage = () => {
  const params = useParams();
  const id = params.id as string;
  const planId = +id;
  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useGetCompanyActiveSubscription();
  const [filter, setFilter] = useState<
    Pick<TCompanySubscription, "currency" | "billingCycle">
  >({
    billingCycle: "monthly",
    currency: "USD",
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
            <div className="Container space-y-8 lg:space-y-16">
              <PageIntro
                title="Purchase Plan"
                link={appRoutes.settings}
                comps={[
                  <div className="flex gap-x-2">
                    <Segmented
                      options={["USD", "NGN"].map((item) => ({
                        label: <span className="uppercase">{item}</span>,
                        value: item,
                      }))}
                      size="large"
                      value={filter.currency}
                      onChange={(val) =>
                        setFilter((v) => ({
                          ...v,
                          currency: val as TSubscriptionPriceType,
                        }))
                      }
                    />
                    <Segmented
                      options={["monthly", "yearly"].map((item) => ({
                        label: <span className="capitalize">{item}</span>,
                        value: item,
                      }))}
                      value={filter.billingCycle}
                      size="large"
                      onChange={(val) =>
                        setFilter((v) => ({
                          ...v,
                          billingCycle: val as TBillingCycle,
                        }))
                      }
                    />
                  </div>,
                ]}
              />
              <CreateCompanySubscriptionContextProvider>
                <PurchaseModulesContainer
                  subscription={subscription}
                  currency={filter.currency}
                  cycle={filter.billingCycle}
                  planId={planId}
                  type="plan"
                />
              </CreateCompanySubscriptionContextProvider>
            </div>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default PurchaseSubscriptionByPlanPage;
