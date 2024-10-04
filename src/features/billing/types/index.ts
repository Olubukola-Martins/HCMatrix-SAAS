import { TBillingCycle } from "./billingCycle";
import { TSubscriptionPriceType } from "./priceType";

export type TAddOn = {
  name: string;
  title: string;
  options: Option[];
};

interface Option {
  label: string;
  value: string;
}

export interface GeneralPrice {
  id: number;
  planId: number | null;
  addonId: number;
  moduleId: number | null;
  amount: string;
  billingCycle: TBillingCycle;
  currency: TSubscriptionPriceType;
  createdAt: string;
  updatedAt: string;
}
