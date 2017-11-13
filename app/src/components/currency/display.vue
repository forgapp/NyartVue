<template>
  <div>
    {{ formattedCurrency }}
  </div>
</template>

<script>
  export default {
    name: 'currencyDisplay',
    props: [ 'value', 'symbol' ],
    computed: {
      formattedCurrency() {
        const currency = this.value.toString();
        const currencyString = currency.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        return currencyString + this.symbol;
      }
    }
  };
</script>
