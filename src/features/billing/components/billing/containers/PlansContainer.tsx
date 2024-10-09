import React from "react";
import SubscriptionPlansCard from "../cards/SubscriptionPlansCard";
import { Carousel, Skeleton } from "antd";
import SubscriptionBreakdownCard from "../cards/SubscriptionBreakdownCard";
import { useGetSubscriptionPlans } from "features/billing/hooks/plan/useGetSubscriptionPlans";
import formatCurrency from "features/billing/utils/currencyFormatter";
import { calculateTotalAmountFromSubscriptionPrices } from "features/billing/utils";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";

const PlansContainer: React.FC<
  Pick<TCompanySubscription, "currency" | "billingCycle">
> = ({ billingCycle, currency }) => {
  const { data, isLoading } = useGetSubscriptionPlans();
  const { data: sub, isLoading: isLoadingSub } =
    useGetCompanyActiveSubscription();
  return (
    <Skeleton
      active
      loading={isLoading ?? isLoadingSub}
      paragraph={{ rows: 24 }}
    >
      <div className="flex flex-col gap-y-9">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">
            Subscription Plans on Module based
          </p>
          <div className="hidden lg:grid lg:grid-cols-3 gap-x-6 gap-y-14 grid-cols-1 ">
            {data?.data.map((s, i) => (
              <SubscriptionPlansCard
                key={s.id}
                name={s.name}
                description={s.description ?? ""}
                modules={s.modules.map((m) => m.name)}
                costDescription={formatCurrency({
                  amount: calculateTotalAmountFromSubscriptionPrices({
                    prices: s.prices,
                    cycle: billingCycle,
                    currency,
                  }),
                  currency,
                })}
                // extraClass={i === 0 ? "" : "border-r-[3px] border-[#CBCBCB] "}
              />
            ))}
          </div>

          <div className="lg:hidden w-full">
            <Carousel
              className=" mx-auto flex justify-center items-center w-full"
              dots={true}
              autoplay
            >
              {data?.data.map((s, i) => (
                <SubscriptionPlansCard
                  key={s.id}
                  name={s.name}
                  description={s.description ?? ""}
                  modules={s.modules.map((m) => m.name)}
                  costDescription={formatCurrency({
                    amount: calculateTotalAmountFromSubscriptionPrices({
                      prices: s.prices,
                      cycle: billingCycle,
                      currency,
                    }),
                    currency,
                  })}
                />
              ))}
            </Carousel>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">
            Subscription Breakdown of Plan with pricing 
          </p>
          <div className="lg:grid lg:grid-cols-3 gap-x-6 gap-y-14 grid-cols-1 ">
            {data?.data.map((s) => (
              <SubscriptionBreakdownCard
                key={s.id}
                id={s.id}
                name={s.name}
                rateDetails={[
                  [
                    `${formatCurrency({
                      amount: calculateTotalAmountFromSubscriptionPrices({
                        prices: s.prices,
                        cycle: billingCycle,
                        currency,
                      }),
                      currency,
                    })}/${billingCycle}`,
                  ],
                ]}
                isActivePlan={sub?.planId === s.id}
                features={s.modules.map((b) => ({ name: b.name }))}
                extraStyles="w-2/5"
              />
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default PlansContainer;
