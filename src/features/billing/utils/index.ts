import { TLicenseType } from "features/authentication/types/auth-user";
import { TBillingCycle } from "../types/billingCycle";
import { TSubscriptionPriceType } from "../types/priceType";
import { TSubscription } from "../types/subscription";

export const getPricePerEmployee = (props: {
  subscription: TSubscription;
  selectedPriceType: TSubscriptionPriceType;
  selectedBillingCycle: TBillingCycle;
  type: TLicenseType;
}): number => {
  const { subscription, selectedBillingCycle, selectedPriceType, type } = props;
  let amount = 0;
  const price = subscription.prices.find(
    (price) => price.type === selectedPriceType
  );
  // licensed
  if (price && selectedBillingCycle === "yearly" && type === "licensed") {
    amount = +price.yearlyPricePerLicensedEmployee;
  }
  if (price && selectedBillingCycle === "monthly" && type === "licensed") {
    amount = +price.monthlyPricePerLicensedEmployee;
  }
  // unlicensed
  if (price && selectedBillingCycle === "yearly" && type === "unlicensed") {
    amount = +price.yearlyPricePerUnlicensedEmployee;
  }
  if (price && selectedBillingCycle === "monthly" && type === "unlicensed") {
    amount = +price.monthlyPricePerUnlicensedEmployee;
  }
  return amount;
};
