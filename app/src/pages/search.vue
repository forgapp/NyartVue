<template>
  <div class="container is-fluid is-fullheight">
    <div class="section">
      <h3 class="title is-4">
        Search <small v-if="total !== null">({{ total }} results)</small>
      </h3>
    </div>
    <spinner v-if="isSearching" />
    <div v-else class="section is-scrollable">
      <search-results />
    </div>
  </div>
</template>

<script>
  import SearchResults from '@/components/search/results';
  import { mapState } from 'vuex';

  export default {
    name: 'home',
    components: { SearchResults },
    computed: mapState('search', [ 'isSearching', 'total' ])
  };
</script>

<style scoped>
  .is-scrollable {
    height: calc(100% - 60px);
    overflow: auto;
  }
</style>
