import React from "react";
import { ModuleCards } from "./ModuleCards";
import { Form, Skeleton } from "antd";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { TBillingCycle } from "features/billing/types/billingCycle";
import { getPricePerEmployee } from "features/billing/utils";
import {
  ECreateCompanySubscriptionOps,
  useCreateCompanySubscriptionStateAndDispatch,
} from "features/billing/stateManagers";
import { TSubscription } from "features/billing/types/subscription";
import { IModulesCardData } from "../../billing/cards/ModulesCard";

const modules: IModulesCardData[] = [
  {
    name: "Employee Management",
    label: "employee-management",
    icon: <i className="ri-line-chart-line text-xs text-white font-light" />,
  },
  {
    name: "HR Admin",
    label: "hr-admin",
    icon: <i className="ri-book-2-line text-xs text-white font-light" />,
  },
  {
    name: "Time and Attendance",

    label: "time-and-attendance",
    icon: <i className="ri-time-line text-xs text-white font-light" />,
  },
  {
    name: "Payroll",
    label: "payroll",
    icon: <i className="ri-book-2-line text-xs text-white font-light" />,
  },
];

const ModuleContainer: React.FC<{
  currency?: TSubscriptionPriceType;
  billingCycle?: TBillingCycle;
  isLoading?: boolean;
  subscriptions?: TSubscription[];
}> = ({
  currency = "USD",
  billingCycle = "yearly",
  isLoading,
  subscriptions,
}) => {
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-left pb-2 text-lg">
        Here are the modules purchased based on your plan.
      </p>
      <Skeleton loading={isLoading} active paragraph={{ rows: 40 }}>
        <ModuleCards
          Form={Form}
          onChange={(val) =>
            dispatch({
              type: ECreateCompanySubscriptionOps.update,
              payload: { purchased: val.map((item) => +item) },
            })
          }
          data={subscriptions?.map((item, index) => ({
            subscriptionId: item.id,
            disabled: item.label === "employee-management",
            icon: (
              <div
                className={`h-6 w-6 rounded flex align-middle justify-center py-1  ${
                  index % 4 === 0
                    ? "bg-[#7987A5]"
                    : index % 4 === 1
                    ? "bg-[#4764FF]"
                    : index % 4 === 2
                    ? "bg-[#FD8311D1]"
                    : "bg-[#FF6647]"
                } `}
              >
                {modules.find((module) => module.name === item.name)?.iconUrl}
              </div>
            ),
            pricePerLicensedEmployee:
              item.label === "employee-management"
                ? undefined
                : {
                    amount: getPricePerEmployee({
                      selectedPriceType: currency,
                      selectedBillingCycle: billingCycle,
                      subscription: item,
                      type: "licensed",
                    }),
                    currency: PRICE_TYPE_CURRENCY[currency],
                  },
            title: {
              mainText: item.name,
              supportingText: item.description,
            },
            features: item.resources.map((item) => item.resource.name),
          }))}
        />
      </Skeleton>
    </div>
  );
};

export default ModuleContainer;
