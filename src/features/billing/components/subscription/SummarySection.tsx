import { AppButton } from "components/button/AppButton";
import { SummaryCard } from "components/cards/SummaryCard";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";

import { useGetCreateCompanySubscriptionSummary } from "features/billing/hooks/useGetCreateCompanySubscriptionSummary";

import { TSubscription } from "features/billing/types/subscription";
import React from "react";
import { boxStyle } from "styles/reused";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const SummarySection: React.FC<{
  subscriptions?: TSubscription[];
  loading?: boolean;
  proceed?: {
    fn: () => void;
    text?: string;
    isLoading?: boolean;
  };
}> = ({ subscriptions, loading, proceed }) => {
  const {
    totalEmployeeCost,
    totalNoOfUsers,
    priceType,
    licensedEmployeeCount,
    unlicensedEmployeeCount,
    vat,
    discount,
    totalCost,
    supportCasePrice,
    trainingSessionPrice,
    storagePrice,
    isLoading,
    vatPercentage,
    discountPercentage,
  } = useGetCreateCompanySubscriptionSummary({ subscriptions });

  return (
    <div
      className={`${boxStyle} text-sm bg-card flex flex-col gap-4 items-stretch`}
    >
      <SummaryCard
        isLoading={isLoading || loading}
        title="Summary"
        highlights={[
          {
            name: "Number of User",
            value: formatNumberWithCommas(totalNoOfUsers, 0),
          },
          {
            name: "Monthly Amount",
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
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
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
              storagePrice
            )}`,
          },
          {
            name: "Training",
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
              trainingSessionPrice
            )}`,
          },
          {
            name: "Support",
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
              supportCasePrice
            )}`,
          },
          {
            name: `Vat(${vatPercentage}%)`,
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
              vat
            )}`,
          },
          {
            name: `Discount(${discountPercentage}%)`,
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
              discount
            )}`,
          },
          {
            name: "Total Amount",
            value: `${PRICE_TYPE_CURRENCY[priceType]} ${formatNumberWithCommas(
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
