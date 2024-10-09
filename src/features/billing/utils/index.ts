import { TLicenseType } from "features/authentication/types/auth-user";
import { TBillingCycle } from "../types/billingCycle";
import { TSubscriptionPriceType } from "../types/priceType";
import { TSubscription } from "../types/subscription";
import { AciveCompanySubscription } from "../types/company/active-company-subscription";
import { IModulesCardData } from "../components/billing/cards/ModulesCard";
import formatCurrency from "./currencyFormatter";
import moment from "moment";
import { TSubscriptionPlan } from "../hooks/plan/useGetGetSubscriptionPlanById";
import { GeneralPrice } from "../types";
import { TCompanySubscriptionDiscount } from "../types/discount";

export const calculateCompanyDiscount = ({
  initialTotalCost,
  discountData,
}: {
  discountData?: TCompanySubscriptionDiscount;
  initialTotalCost: number;
}): number => {
  let amount = 0;
  if (discountData?.type === "amount") {
    amount = +(discountData.value || 0);
    return amount;
  }
  if (discountData?.type === "percentage") {
    let percentage = +(discountData.value || 0);
    if (percentage === 0) return 0;
    amount = percentage * 100 * initialTotalCost;
    return amount;
  }
  return amount;
};

export const calculateTotalAmountFromSubscriptionPrices = (
  props: {
    prices?: GeneralPrice[];
    cycle?: TBillingCycle;
    currency?: TSubscriptionPriceType;
  } = {}
): number => {
  let amount = 0;
  const { currency = "NGN", cycle = "monthly", prices } = props;

  const summedPriceAmount = prices
    ?.filter((p) => p.billingCycle === cycle && p.currency === currency)
    .reduce((prev, curr) => prev + +curr.amount, 0);
  amount = summedPriceAmount ?? 0;

  return amount;
};

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

export const contructBillingDetailsBasedOnSubsriptionType = (
  sub?: AciveCompanySubscription
) => {
  let subName = "";
  let billingPrice = 0;
  let currentUsers = 0;
  let userLimit = 0;
  let billingCurrency: TSubscriptionPriceType = "NGN";
  let billingCycle: TBillingCycle = "monthly";
  let modules: IModulesCardData[] = [];
  let currentReoccuringAmount = `N/A`;
  let nextReoccuringDate = `N/A`;
  const currentBilling = sub?.billingHistory?.[0];
  switch (sub?.type) {
    case "module":
      subName = "Module Selection";
      billingCurrency = sub.currency;
      billingCycle = sub.billingCycle;
      billingPrice = currentBilling?.amountPaid
        ? +currentBilling?.amountPaid
        : 0;
      currentReoccuringAmount = sub.autoRenewal
        ? formatCurrency({ amount: billingPrice, currency: billingCurrency })
        : "N/A";
      nextReoccuringDate = sub.autoRenewal
        ? moment(sub.endDate).format("MMMM DD, YYYY")
        : "N/A";
      currentUsers = sub.totalLicensedUsedCount;
      userLimit = sub.totalLicensesPurchasedCount;
      modules = sub.modules.map((item) => ({
        label: item.label,
        name: item.name,
        icon: null,
      }));

      break;
    case "plan":
      subName = `${sub.plan.name}`;
      billingCurrency = sub.currency;
      billingCycle = sub.billingCycle;

      billingPrice = currentBilling?.amountPaid
        ? +currentBilling?.amountPaid
        : 0;
      currentReoccuringAmount = sub.autoRenewal
        ? formatCurrency({ amount: billingPrice, currency: billingCurrency })
        : "N/A";
      nextReoccuringDate = sub.autoRenewal
        ? moment(sub.endDate).format("MMMM DD, YYYY")
        : "N/A";
      currentUsers = sub.totalLicensedUsedCount;
      userLimit = sub.totalLicensesPurchasedCount;
      modules = sub.plan.modules.map((item) => ({
        label: item.label,
        name: item.name,
        icon: null,
      }));

      break;

    default:
      break;
  }

  return {
    subName,
    billingPrice,
    currentUsers,
    userLimit,
    modules,
    billingCurrency,
    billingCycle,
    currentReoccuringAmount,
    nextReoccuringDate,
  };
};

export const generateRandomBgColorClassNameForSubscriptionModule = (
  index: number = 0
) => {
  const bgColors = [
    "bg-[#7987A5]",
    "bg-[#4764FF]",
    "bg-[#FD8311D1]",
    "bg-[#FF6647]",
  ];

  return bgColors[index % bgColors.length];
};

export const calculateSubscriptionPlanTotalPrice = (
  subPlanPrices: TSubscriptionPlan["prices"],
  billingCycle: TBillingCycle,
  currency: TSubscriptionPriceType
): number => {
  const amount = subPlanPrices
    .filter(
      (price) =>
        price.billingCycle === billingCycle && price.currency === currency
    )
    .reduce((prev, curr) => prev + +curr.amount, 0);
  return amount;
};
export const calculatAddonTotalPrice = (
  prices: GeneralPrice[] = [],
  billingCycle: TBillingCycle,
  currency: TSubscriptionPriceType
): number => {
  const amount = prices
    .filter(
      (price) =>
        price.billingCycle === billingCycle && price.currency === currency
    )
    .reduce((prev, curr) => prev + +curr.amount, 0);
  return amount;
};
