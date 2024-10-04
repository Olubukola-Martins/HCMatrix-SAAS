import { ICurrencyFormatterProp } from "../types/priceType";

export default function formatCurrency({
  amount,
  currency = "USD",
}: ICurrencyFormatterProp) {
  console.log(amount, currency);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
