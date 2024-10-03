import { TBillingCycle } from "../../billingCycle";
import { TSubscriptionPriceType } from "../../priceType";
import { TSubscriptionLabel } from "../../subscription";
import { TAddOnType, TSubscriptionStatus } from "./common";

export interface ActiveModuleSubscription {
  totalLicensedUsedCount: number;
  totalUnlicensedUsedCount: number;
  totalLicensesUsedCount: number;
  totalLicensesPurchasedCount: number;
  id: number;
  companyId: number;
  type: "module";
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
  planId: null;
  pricingId: null;
  createdAt: string;
  updatedAt: string;
  modules: Module[];
  addons: Addon[];
  billingHistory: BillingHistory[];
}

interface BillingHistory {
  id: number;
  companyId: number;
  companySubscriptionId: number;
  billingDate: string;
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
  size?: string;
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

interface Module {
  id: number;
  name: string;
  label: TSubscriptionLabel;
  iconUrl: null;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  CompanySubscriptionModule: CompanySubscriptionModule;
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

interface CompanySubscriptionModule {
  companySubscriptionId: number;
  moduleId: number;
  pricingId: number;
  createdAt: string;
  updatedAt: string;
}
