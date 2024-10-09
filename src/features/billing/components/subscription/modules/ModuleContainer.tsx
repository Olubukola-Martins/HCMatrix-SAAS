import React from "react";
import { ModuleCards } from "./ModuleCards";
import { Form, Skeleton } from "antd";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { TBillingCycle } from "features/billing/types/billingCycle";
import {
  calculateSubscriptionPlanTotalPrice,
  generateRandomBgColorClassNameForSubscriptionModule,
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
import { ActiveModuleSubscription } from "features/billing/types/company/active-company-subscription/module";

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
  const moduleDataUnParsed:
    | (IModuleCardProps &
        Pick<
          ActiveModuleSubscription["modules"][number],
          "iconUrl" | "name" | "label"
        >)[]
    | undefined =
    sub?.type === "plan"
      ? sub.plan.modules.map((m) => ({
          ...m,
          icon: null,
          title: {
            mainText: m.name,
            supportingText: m.description ?? "",
          },
          disabled: true,
          features: m?.features?.map((f) => f.name),
          // pricePerLicensedEmployee: { //Commented bcos BE does not provide data needed
          //   amount: 0,
          //   currency: PRICE_TYPE_CURRENCY[sub.currency],
          // },
          subscriptionId: sub.id,
        }))
      : sub?.modules.map((m) => ({
          ...m,
          icon: null,

          title: {
            mainText: m.name,
            supportingText: m.description ?? "",
          },
          disabled: true,
          features: m?.features?.map((f) => f.name),
          // pricePerLicensedEmployee: {
          //   amount: 0,
          //   currency: PRICE_TYPE_CURRENCY[sub.currency],
          // },
          subscriptionId: sub.id,
        }));

  const moduleData = moduleDataUnParsed?.map((module, index) => {
    const bgColor = generateRandomBgColorClassNameForSubscriptionModule(index);
    return {
      ...module,
      icon: (
        <div
          className={`h-6 w-6 rounded flex align-middle justify-center py-1  ${bgColor} `}
        >
          {module?.iconUrl ? (
            <img src={module?.iconUrl} alt={module.name} />
          ) : (
            SUBSCRIPTION_ICON_MAPPING?.[module.label]
          )}
        </div>
      ),
    };
  });
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
