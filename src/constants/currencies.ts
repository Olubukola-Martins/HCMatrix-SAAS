const CURRENCIES = [
  { name: "United States", currency: "US Dollar", currencySymbol: "$" },
  { name: "United Kingdom", currency: "British Pound", currencySymbol: "£" },
  { name: "Japan", currency: "Japanese Yen", currencySymbol: "¥" },
  { name: "Eurozone", currency: "Euro", currencySymbol: "€" },
  // Add more countries as needed
];

export const CURRENCY_OPTIONS = CURRENCIES.map((item) => ({
  label: `${item.currency}(${item.currencySymbol})`,
  value: item.currency,
}));
