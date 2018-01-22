<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <detail-layout :type="type" :id="id"/>
    </div>
  </div>
</template>

<script>
  import DetailLayout from '@/components/details';

  export default {
    name: 'details',
    components: { DetailLayout },
    computed: {
      type: function () {
        return this.$route.params.type;
      },
      id: function () {
        return this.$route.params.id;
      }
    }
  };
</script>

<style scoped>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }
</style>