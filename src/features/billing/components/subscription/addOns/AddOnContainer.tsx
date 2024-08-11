import React from "react";
import { Form, Skeleton } from "antd";
import { SelectedModulesSection } from "./SelectedModulesSection";
import { AddOnSection } from "./AddOnSection";

import { TBillingCycle } from "features/billing/types/billingCycle";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";
import { useGetCreateCompanySubscriptionSummary } from "features/billing/hooks/useGetCreateCompanySubscriptionSummary";
import { TSubscription } from "features/billing/types/subscription";
import SummarySection from "../SummarySection";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const AddOnContainer: React.FC<{
  Form: typeof Form;
  selectedPriceType?: TSubscriptionPriceType;
  selectedBillingCycle?: TBillingCycle;
  autoRenewal: boolean;
  handleAutoRenewal: (val: boolean) => void;
  subscriptions?: TSubscription[];
  isLoading?: boolean;
  onProceed: () => void;
  showModules?:boolean
}> = ({
  Form,
  selectedPriceType = "usd",
  selectedBillingCycle = "yearly",
  autoRenewal,
  handleAutoRenewal,
  subscriptions,
  isLoading,
  onProceed,showModules
}) => {
  const {
    pricePerLicensedEmployee,
    selectedModules,
    pricePerUnLicensedEmployee,
  } = useGetCreateCompanySubscriptionSummary({
    subscriptions,
  });
  return (
    <Skeleton loading={isLoading} active paragraph={{ rows: 40 }}>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          <SelectedModulesSection showModules={showModules} Form={Form} pricePerUser={`${PRICE_TYPE_CURRENCY[selectedPriceType]} ${formatNumberWithCommas(pricePerLicensedEmployee)}`} selectedModules={selectedModules.map((item) => item.name)} />
          <AddOnSection Form={Form} pricePerUser={`${PRICE_TYPE_CURRENCY[selectedPriceType]} ${formatNumberWithCommas(pricePerUnLicensedEmployee)}`} autoRenewal={autoRenewal} handleAutoRenewal={handleAutoRenewal} />
        </div>

        <div className="flex flex-col gap-4">
          <SummarySection
            subscriptions={subscriptions}
            loading={isLoading}
            proceed={{
              text: "Proceed",
              fn() {
                onProceed();
              },
            }}
          />
        </div>
      </div>
    </Skeleton>
  );
};

export default AddOnContainer;
