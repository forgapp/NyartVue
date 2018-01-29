<script>
  import Address from './address';

  export default {
    functional: true,
    render(h, { props }) {
      const { addresses } = props;
      const hasResults = addresses && addresses.length > 0;

      if (!hasResults) {
        return h('div', 'No Addresses');
      }

      const addressesList = addresses.map(address => h(
        'div',
        { class: 'column is-12' },
        [ h(Address, { props: { address } }) ]
      ));

      return h('div', { class: 'columns is-multiline' }, addressesList);
    }
  };
</script>

<style>
  .content.address > p {
    margin-bottom: 0;
  }
</style>
