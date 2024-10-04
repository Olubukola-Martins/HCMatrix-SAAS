import { AppButton } from "components/button/AppButton";
import { SummaryCard } from "components/cards/SummaryCard";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";

import { useGetCreateCompanySubscriptionSummary } from "features/billing/hooks/useGetCreateCompanySubscriptionSummary";
import { Form as _Form } from "antd";
import React from "react";
import { cardStyle } from "styles/reused";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { TBillingCycle } from "features/billing/types/billingCycle";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { useCreateCompanySubscriptionStateAndDispatch } from "features/billing/stateManagers";

const SummarySection: React.FC<{
  Form: typeof _Form;
  selectedPriceType?: TSubscriptionPriceType;
  selectedBillingCycle?: TBillingCycle;

  summaryNotes?: React.ReactNode | string;
  proceed?: {
    fn: () => void;
    text?: string;
    isLoading?: boolean;
  };
}> = ({
  Form,
  selectedBillingCycle,
  selectedPriceType,
  proceed,
  summaryNotes,
}) => {
  const {
    state: {
      licensedEmployeeCount,
      unlicensedEmployeeCount,
      planOrModulePrices,
    },
  } = useCreateCompanySubscriptionStateAndDispatch();
  const {
    totalEmployeeCost,
    totalNoOfUsers,
    currency,
    vat,
    discount,
    totalCost,
    supportCasePrice,
    trainingSessionPrice,
    storagePrice,
    isLoading,
    vatPercentage,
    discountPercentage,
    remainingFundsAmount,
  } = useGetCreateCompanySubscriptionSummary({
    currency: selectedPriceType,
    cycle: selectedBillingCycle,
  });

  return (
    <div className={` ${cardStyle} text-sm flex flex-col gap-4 items-stretch`}>
      <SummaryCard
        isLoading={isLoading}
        title="Summary"
        summaryNotes={summaryNotes}
        highlights={[
          {
            name: "Number of User",
            value: formatNumberWithCommas(totalNoOfUsers, 0),
          },
          {
            name: "Monthly Amount",
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              totalEmployeeCost
            )}`, //TODO: Refactor to a function to avoid repetion
          },
        ]}
        details={[
          {
            name: "Total User Licenses",
            value: formatNumberWithCommas(licensedEmployeeCount ?? 0, 0),
          },
          {
            name: "Number of Unlicensed Users",
            value: formatNumberWithCommas(unlicensedEmployeeCount ?? 0, 0),
          },
          {
            name: "Storage",
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              storagePrice
            )}`,
          },
          {
            name: "Training",
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              trainingSessionPrice
            )}`,
          },
          {
            name: "Support",
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              supportCasePrice
            )}`,
          },
          {
            name: `Vat(${vatPercentage}%)`,
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              vat
            )}`,
          },
          {
            name: `Discount(${discountPercentage}%)`,
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              discount
            )}`,
          },
          {
            name: `Remining Funds`,
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              remainingFundsAmount
            )}`,
          },
          {
            name: "Total Amount",
            value: `${PRICE_TYPE_CURRENCY[currency]} ${formatNumberWithCommas(
              totalCost
            )}`,
          },
        ]}
      />
      {proceed && (
        <AppButton
          handleClick={() => proceed?.fn()}
          disabled={proceed.isLoading}
          isLoading={proceed.isLoading}
          label={proceed?.text ?? "Proceed"}
          type="button"
          additionalClassNames={["button", "w-full"]}
        />
      )}

      <p className="text-center">
        By proceeding, you agree to our{" "}
        <a href="/" target="_blank" className="capitalize text-caramel">
          privacy policy
        </a>
      </p>
    </div>
  );
};

export default SummarySection;
