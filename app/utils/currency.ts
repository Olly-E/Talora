export const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
] as const;

export const getCurrencySymbol = (currencyCode: string): string => {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  return currency?.symbol || "$";
};

export const formatSalaryWithCurrency = (
  salary: string,
  currencyCode: string = "USD",
): string => {
  const symbol = getCurrencySymbol(currencyCode);

  // If the salary already has a currency symbol, return as is
  if (salary.match(/[$€£¥₹₦]/)) {
    return salary;
  }

  // Add the currency symbol
  return `${symbol}${salary}`;
};
