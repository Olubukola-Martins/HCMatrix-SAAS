import { ICurrencyFormatterProp } from "../types/priceType";

export default function formatCurrency({ amount, currency }: ICurrencyFormatterProp) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(+amount.toFixed(2));
}
