export function formatCurrency(value, symbol) {
  let result = '';
  if (value) {
    const currency = value.toString();
    const currencyString = currency.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    result = currencyString + symbol;
  }

  return result;
}
