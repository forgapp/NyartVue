<template>
  <div class="container is-widescreen">
    <h3 class="title is-5 header">Search</h3>
    <search-results />
  </div>
</template>

<script>
  import SearchResults from '@/components/search/results';

  export default {
    name: 'home',
    components: { SearchResults }
  };
</script>

<style scoped>
  .header {
    margin-top: 12px;
    margin-bottom: 0px
  }
</style>
