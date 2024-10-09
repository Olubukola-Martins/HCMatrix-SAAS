import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { ICurrencyFormatterProp } from "../types/priceType";
import { PRICE_TYPE_CURRENCY } from "../constants";

export default function formatCurrency({
  amount,
  currency = "USD",
}: ICurrencyFormatterProp) {
  return `${PRICE_TYPE_CURRENCY[currency]}${formatNumberWithCommas(amount)}`;
}
