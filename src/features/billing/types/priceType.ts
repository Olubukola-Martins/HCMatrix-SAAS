export type TSubscriptionPriceType = "ngn" | "usd";


export interface ICurrencyFormatterProp {
  amount: number;
  currency: TSubscriptionPriceType;
}
