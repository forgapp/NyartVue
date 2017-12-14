<template>
  <div class="container is-fluid">
    <h3 class="title is-5 header">Search <small v-if="total !== null">({{ total }} results)</small></h3>
    <search-results />
  </div>
</template>

<script>
  import SearchResults from '@/components/search/results';
  import { mapState } from 'vuex';

  export default {
    name: 'home',
    components: { SearchResults },
    computed: {
      ...mapState('search', [ 'total' ])
    }
  };
</script>

<style scoped>
  .header {
    margin-top: 12px;
    margin-bottom: 0px
  }
</style>
