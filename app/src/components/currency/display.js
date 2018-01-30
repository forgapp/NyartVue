import { formatCurrency } from '@/lib/currency';

export default {
  functional: true,
  render: (h, { props }) => {
    const { value, symbol } = props;
    const currency = formatCurrency(value, symbol);

    return h('span', currency);
  }
};
