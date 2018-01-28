<template>
  <ul>
    <li v-if="!hasResults">No Emails</li>
    <li class="emailElement" v-for="(email, index) in emails" :key="index">
      <div>
        <span class="icon leftIcon">
          <i class="fa fa-at" aria-hidden="true"></i>
        </span>
        <a :href="`mailto:${email.Address}`">{{ email.Address }}</a>
      </div>
      <div v-if="email.Type" class="heading">({{ email.Type }})</div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'EmailsDisplay',
    props: ['emails'],
    computed: {
      hasResults: function () {
        return this.emails && this.emails.length > 0;
      }
    }
  };
</script>

<style scoped>
  .emailElement {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5em;
  }

  .emailElement .leftIcon {
    margin-right: 0.5em;
  }

  .emailElement .rigthIcon {
    margin-left: 0.5em;
  }
</style>