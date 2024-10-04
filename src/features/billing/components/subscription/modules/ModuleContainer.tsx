import React from "react";
import { ModuleCards } from "./ModuleCards";
import { Form, Skeleton } from "antd";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { TBillingCycle } from "features/billing/types/billingCycle";
import {
  calculateSubscriptionPlanTotalPrice,
  getPricePerEmployee,
} from "features/billing/utils";
import {
  ECreateCompanySubscriptionOps,
  useCreateCompanySubscriptionStateAndDispatch,
} from "features/billing/stateManagers";
import {
  TSubscription,
  TSubscriptionType,
} from "features/billing/types/subscription";
import {
  IModulesCardData,
  SUBSCRIPTION_ICON_MAPPING,
} from "../../billing/cards/ModulesCard";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { EmptyDataWrapper } from "components/data/EmptyDataWrapper";
import { IModuleCardProps } from "./ModuleCard";

const modules: IModulesCardData[] = [
  {
    name: "Employee Management",
    label: "employee-management",
    icon: <i className="ri-line-chart-line text-xs text-white font-light" />,
  },
  {
    name: "HR Admin",
    label: "core-hr",
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
}> = ({ currency = "USD", billingCycle = "yearly", isLoading }) => {
  const { data: sub, isLoading: isLoadingSub } =
    useGetCompanyActiveSubscription();
  const moduleData: IModuleCardProps[] | undefined =
    sub?.type === "plan"
      ? sub.plan.modules.map((m) => ({
          icon: m?.iconUrl ? (
            <img src={m?.iconUrl} alt={m.name} />
          ) : (
            SUBSCRIPTION_ICON_MAPPING?.[m.label]
          ),
          title: {
            mainText: m.name,
            supportingText: m.description ?? "",
          },
          disabled: m.label === "employee-management",
          features: m?.features?.map((f) => f.name),
          pricePerLicensedEmployee: {
            amount: 0,
            currency,
          },
          subscriptionId: sub.id,
        }))
      : sub?.modules.map((m) => ({
          icon: m?.iconUrl ? (
            <img src={m?.iconUrl} alt={m.name} />
          ) : (
            SUBSCRIPTION_ICON_MAPPING?.[m.label]
          ),
          title: {
            mainText: m.name,
            supportingText: m.description ?? "",
          },
          disabled: m.label === "employee-management",
          features: m?.features?.map((f) => f.name),
          pricePerLicensedEmployee: {
            amount: 0,
            currency,
          },
          subscriptionId: sub.id,
        }));
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-left pb-2 text-lg">
        {sub?.type === "plan"
          ? `Here are the modules purchased based on your plan.`
          : `Here are the modules purchase.`}
      </p>
      <Skeleton
        loading={isLoadingSub || isLoading}
        active
        paragraph={{ rows: 40 }}
      >
        <EmptyDataWrapper isEmpty={moduleData?.length === 0}>
          <ModuleCards
            Form={Form}
            onChange={(val) =>
              dispatch({
                type: ECreateCompanySubscriptionOps.update,
                payload: { purchased: val.map((item) => +item) },
              })
            }
            data={moduleData}
          />
        </EmptyDataWrapper>
      </Skeleton>
    </div>
  );
};

export default ModuleContainer;
