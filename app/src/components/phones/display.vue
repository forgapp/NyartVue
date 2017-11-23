<template>
  <ul>
    <li v-if="!hasResults">No Phones</li>
    <li class="phoneElement" v-for="(phone, index) in phones" :key="index">
      <span class="icon leftIcon">
        <i class="fa fa-phone" aria-hidden="true"></i>
      </span>
      <a :href="`tel:${phone.Number}`">{{ phone.Number }}</a>
      <small class="rigthIcon" v-if="phone.Type">({{ phone.Type }})</small>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'phoneDisplay',
    props: ['phones'],
    computed: {
      hasResults: function () {
        return this.phones && this.phones.length > 0;
      }
    }
  };
</script>

<style scoped>
  .phoneElement {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
  }

  .phoneElement .leftIcon {
    margin-right: 0.5em;
  }

  .phoneElement .rigthIcon {
    margin-left: 0.5em;
  }
</style>