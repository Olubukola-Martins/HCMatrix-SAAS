import { employeeManagementSvg } from "assets/images";
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

const ModuleContainer: React.FC<{
  Form: typeof Form;
  selectedPriceType?: TSubscriptionPriceType;
  selectedBillingCycle?: TBillingCycle;
  isLoading?: boolean;
  subscriptions?: TSubscription[];
}> = ({
  Form,
  selectedPriceType = "usd",
  selectedBillingCycle = "yearly",
  isLoading,
  subscriptions,
}) => {
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <div className="flex flex-col gap-2 w-full">
      <p>Checkbox the module you would like to purchase.</p>
      <Skeleton loading={isLoading} active paragraph={{ rows: 40 }}>
        <ModuleCards
          Form={Form}
          onChange={(val) =>
            dispatch({
              type: ECreateCompanySubscriptionOps.update,
              payload: { purchased: val.map((item) => +item) },
            })
          }
          data={subscriptions?.map((item) => ({
            subscriptionId: item.id,
            icon: (
              // TODO: Refactor to a module icon component
              <div className="bg-[#3A3A3A] p-2 rounded-md">
                <img
                  className="w-[16px] h-[16px]"
                  alt="Employee Management"
                  src={employeeManagementSvg}
                />
              </div>
            ),
            pricePerLicensedEmployee: {
              amount: getPricePerEmployee({
                selectedPriceType,
                selectedBillingCycle,
                subscription: item,
                type: "licensed",
              }),
              currency: PRICE_TYPE_CURRENCY[selectedPriceType],
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
