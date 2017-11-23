<template>
  <ul>
    <li v-if="!hasResults">No Addresses</li>
    <li class="addressElement" v-for="(address, index) in addresses" :key="index">
      <span class="icon leftIcon">
        <i class="fa fa-address-book-o" aria-hidden="true"></i>
      </span>
      <p>
        {{ address.Street }}<br />
        {{ address.Complement }}<br />
        {{ address.City }} {{ address.State }}<br />
        {{ address.Country }}
      </p>
      <small v-if="address.Type" class="rigthIcon">({{ address.Type }})</small>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'AddressesDisplay',
    props: ['addresses'],
    computed: {
      hasResults: function () {
        return this.addresses && this.addresses.length > 0;
      }
    }
  };
</script>

<style scoped>
  .addressElement {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
  }

  .addressElement .leftIcon {
    margin-right: 0.5em;
  }

  .addressElement .rigthIcon {
    margin-left: 0.5em;
  }
</style>