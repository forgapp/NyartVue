<template>
  <div class="">
    <div v-for="(codes, category) in formattedCode" :key="category" class="has-top-margin no-bottom-margin">
      <p>
        <span class="is-size-6 is-capitalized has-text-weight-bold">{{ category }}:</span>
        <span>{{ codes.join(', ') }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { formattCodesArray } from '@/lib/codes';

  export default {
    name: 'DisplayCodes',
    props: ['codes'],
    computed: {
      formattedCode: function () {
        return formattCodesArray(this.codes);
      }
    }
  };
</script>

<style scoped>
  .has-top-margin {
    margin-top: 0.5rem;
  }

  .no-bottom-margin:last-child {
    margin-bottom: 1rem;
  }
</style>
