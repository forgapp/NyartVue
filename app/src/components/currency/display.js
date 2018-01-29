import { formatCurrency } from '@/lib/currency';

export default {
  functional: true,
  render: (h, { props }) => {
    const { value, symbol } = props;
    const currency = formatCurrency(value, symbol);

    return h('span', currency);
  }
};
// <template>
//   <span>
//     {{ formattedCurrency }}
//   </span>
// </template>

// <script>
//   export default {
//     name: 'currencyDisplay',
//     props: [ 'value', 'symbol' ],
//     computed: {
//       formattedCurrency() {
//         if (!this.value) {
//           return '';
//         }

//         const currency = this.value.toString();
//         const currencyString = currency.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

//         return currencyString + this.symbol;
//       }
//     }
//   };
// </script>
