import { TBillingCycle } from "../billingCycle";
import { TSubscriptionPriceType } from "../priceType";
import { TSubscription } from "../subscription";

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
  subscription: TSubscription;
}
