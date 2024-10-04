import { TExtraStorage } from "../addOns/extraStorage";
import { TSupportCase } from "../addOns/supportCase";
import { TTrainingSession } from "../addOns/trainingSession";
import { TBillingCycle } from "../billingCycle";
import { TSubscriptionPriceType } from "../priceType";
import { TSubscription } from "../subscription";
import { AciveCompanySubscription } from "./active-company-subscription";

export type TCompanySubscription = AciveCompanySubscription;
// deprecated

export type TCompanySubscriptionDeprecated = {
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
  addOns: TAddOns;
  transaction: Transaction;
};
interface TAddOns {
  id: number;
  companySubscriptionId: number;
  supportCaseId: number;
  extraStorageId: number;
  trainingSessionId: number;
  createdAt: string;
  updatedAt: string;
  supportCase: TSupportCase;
  extraStorage: TExtraStorage;
  trainingSession: TTrainingSession;
}

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
