export type TSubscriptionPriceType = "NGN" | "USD";

export interface ICurrencyFormatterProp {
  amount: number;
  currency?: TSubscriptionPriceType;
}
