import { TBillingCycle } from "../../billingCycle";
import { TSubscriptionPriceType } from "../../priceType";
import { TSubscriptionLabel } from "../../subscription";
import { TAddOnType, TSubscriptionStatus } from "./common";

export interface ActivePlanSubscription {
  totalLicensedUsedCount: number;
  totalUnlicensedUsedCount: number;
  totalLicensesUsedCount: number;
  totalLicensesPurchasedCount: number;
  id: number;
  companyId: number;
  type: "plan";
  startDate: string;
  endDate: string;
  billingCycle: TBillingCycle;
  currency: TSubscriptionPriceType;
  autoRenewal: boolean;
  status: TSubscriptionStatus;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  vatId: number;
  discountId: null;
  planId: number;
  pricingId: number;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
  addons: Addon[];
  billingHistory: BillingHistory[];
}

interface BillingHistory {
  id: number;
  companyId: number;
  companySubscriptionId: number;
  billingDate: string;
  totalSubscriptionAmount: string;
  totalAddonAmount: string;
  totalDiscountAmount: string;
  totalVatAmount: string;
  totalAmount: string;
  amountPaid: string;
  currency: TSubscriptionPriceType;
  status: string;
  name: string;
  phone: string;
  addressId: number;
  paymentReference: string;
  createdAt: string;
  updatedAt: string;
}

interface Addon {
  id: number;
  name: string;
  label: string;
  type: TAddOnType;
  description: string;
  trainingHours: null | number;
  createdAt: string;
  updatedAt: string;
  CompanySubscriptionAddon: CompanySubscriptionAddon;
}

interface CompanySubscriptionAddon {
  companySubscriptionId: number;
  addonId: number;
  pricingId: number;
  createdAt: string;
  updatedAt: string;
}

interface Plan {
  id: number;
  name: string;
  label: string;
  isFree: boolean;
  description: null;
  createdAt: string;
  updatedAt: string;
  modules: Module[];
}

interface Module {
  id: number;
  name: string;
  label: TSubscriptionLabel;
  iconUrl: null;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  subscription_plan_module: Subscriptionplanmodule;
  features: Feature[];
}

interface Feature {
  id: number;
  name: string;
  label: string;
  moduleId: number;
  createdAt: string;
  updatedAt: string;
}

interface Subscriptionplanmodule {
  createdAt: string;
  updatedAt: string;
  moduleId: number;
  planId: number;
}
