
<script>
  export default {
    name: 'AddressesDisplay',
    functional: true,
    props: ['addresses'],
    render(createElement, context) {
      const { addresses } = context.props;
      const hasResults = addresses && addresses.length > 0;

      if (!hasResults) {
        return (<div>No Addresses</div>);
      }

      const addressesList = addresses.map(address => (<div class="column is-12">
        <article class="media">
          <div class="media-left">
            <span class="icon leftIcon">
              <i class="fa fa-address-book-o" aria-hidden="true"></i>
            </span>
            <div class="heading">({ address.Type })</div>
          </div>
          <div class="media-content">
            <div class="content address">
              <p>{ address.Street }</p>
              <p>{ address.Complement }</p>
              <p>{ address.City } { address.State }</p>
              <p>{ address.Country }</p>
            </div>
          </div>
        </article>
      </div>));

      return (<div class="columns is-multiline">
        { addressesList }
      </div>);
    }
  };
</script>

<style>
  .content.address > p {
    margin-bottom: 0;
  }
</style>
