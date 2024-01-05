import { TBillingCycle } from "../billingCycle";
import { TSubscriptionPriceType } from "../priceType";

export type TCompanySubscription = {
  id: number;
  companyId: number;
  isActive: boolean;
  isFreeTrial: boolean;
  autoRenew: boolean;
  billingCycle: TBillingCycle;
  priceType: TSubscriptionPriceType;
  startDate: string;
  endDate: string;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  deactivatedEmployeeCount: number;
  createdAt: string;
  updatedAt: string;
  purchased: Purchased[];
  transaction: Transaction;
};

interface Transaction {
  id: number;
  companySubscriptionId: number;
  vat: string;
  discount: string;
  totalAmount: string;
  totalAmountPaid: string;
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

interface Purchased {
  id: number;
  companySubscriptionId: number;
  subscriptionId: number;
  createdAt: string;
  updatedAt: string;
  subscription: Subscription;
}

interface Subscription {
  id: number;
  type: string;
  name: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  prices: Price[];
  resources: Resource2[];
}

interface Resource2 {
  id: number;
  subscriptionId: number;
  resourceId: number;
  createdAt: string;
  updatedAt: string;
  resource: Resource;
}

interface Resource {
  id: number;
  name: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Price {
  id: number;
  subscriptionId: number;
  type: string;
  monthlyPricePerLicensedEmployee: string;
  monthlyPricePerUnlicensedEmployee: string;
  yearlyPricePerLicensedEmployee: string;
  yearlyPricePerUnlicensedEmployee: string;
  createdAt: string;
  updatedAt: string;
}
