import { GeneralPrice } from "../..";
import { TBillingCycle } from "../../billingCycle";
import { TSubscriptionPriceType } from "../../priceType";

export type TExtraStorage = {
  size: string;
  id: number;
  name: string;
  label: string;
  type: "storage";
  description: string;
  trainingHours: null;
  createdAt: string;
  updatedAt: string;
  prices: GeneralPrice[];
};
