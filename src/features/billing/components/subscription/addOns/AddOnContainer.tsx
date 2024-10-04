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
import { SelectedPlansSection } from "./SelectedPlansSection";

const AddOnContainer: React.FC<{
  Form: typeof Form;
  selectedPriceType?: TSubscriptionPriceType;
  selectedBillingCycle?: TBillingCycle;
  autoRenewal?: boolean;
  handleAutoRenewal?: (val: boolean) => void;
  subscriptions?: TSubscription[];
  isLoading?: boolean;
  onProceed: () => void;
  showModules?: boolean;
  showPlans?: boolean;
  planId?: number;
}> = ({
  Form,
  selectedPriceType = "USD",
  selectedBillingCycle = "yearly",
  autoRenewal = false,
  subscriptions,
  isLoading,
  onProceed,
  showModules,
  showPlans,
  handleAutoRenewal = () => {},
  planId,
}) => {
  const { pricePerLicensedEmployee, pricePerUnLicensedEmployee } =
    useGetCreateCompanySubscriptionSummary({
      currency: selectedPriceType,
      cycle: selectedBillingCycle,
    });
  return (
    <Skeleton loading={isLoading} active paragraph={{ rows: 40 }}>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          {showPlans ? (
            <SelectedPlansSection
              planId={planId}
              Form={Form}
              pricePerUser={`${
                PRICE_TYPE_CURRENCY[selectedPriceType]
              } ${formatNumberWithCommas(pricePerLicensedEmployee)}`}
            />
          ) : (
            <SelectedModulesSection
              showModules={showModules}
              Form={Form}
              pricePerUser={`${
                PRICE_TYPE_CURRENCY[selectedPriceType]
              } ${formatNumberWithCommas(pricePerLicensedEmployee)}`}
            />
          )}
          <AddOnSection
            Form={Form}
            pricePerUser={`${
              PRICE_TYPE_CURRENCY[selectedPriceType]
            } ${formatNumberWithCommas(pricePerUnLicensedEmployee)}`}
            autoRenewal={autoRenewal}
            handleAutoRenewal={handleAutoRenewal}
          />
        </div>

        <div className="flex flex-col gap-4">
          <SummarySection
            Form={Form}
            selectedBillingCycle={selectedBillingCycle}
            selectedPriceType={selectedPriceType}
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
