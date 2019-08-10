const digitsRE = /(\d{3})(?=\d)/g;

export default function currency(value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currency = currency != null ? currency : '$';
  decimals = decimals != null ? decimals : 2;
  const stringified = Math.abs(value).toFixed(decimals);
  const int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  const i = int.length % 3;
  const head = i > 0 ? int.slice(0, i) + (int.length > 3 ? ',' : '') : '';
  const float = decimals ? stringified.slice(-1 - decimals) : '';
  const sign = value < 0 ? '-' : '';
  return sign + currency + head + int.slice(i).replace(digitsRE, '$1,') + float;
}
