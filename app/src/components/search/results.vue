<template>
  <div>
    <spinner v-if="isSearching" />
	  <div class="columns is-multiline section">
	    <div class="notification is-danger fullwidth" v-if="error">
	      Error while searching.<br />
	      Check your network connection.
	     </div>
	    <div class="notification is-warning fullwidth" v-if="this.total === 0">
	      No Results Found.
	    </div>
	    <div class="column is-half is-fullheight" v-for="item in results" v-if="total > 0" :key="item._id">
	      <dynamic-card :key="item._id" :index="item._index" :hit="item" />
	     </div>
	  </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { DynamicCard } from '@/components/cards';

  export default {
    name: 'searchResults',
    components: { DynamicCard },
    computed: {
      ...mapState('search', ['isSearching', 'results', 'total', 'error']),
      searchText: {
        get() {
          return this.$store.state.search.searchText;
        },
        set(value) {
          this.$store.commit('search/updateSearchText', value);
        }
      },
      predefinedSearch: {
        get() {
          return this.$store.state.search.predefinedSearch;
        },
        set(value) {
          console.log(value);
          this.$store.commit('search/updatePredefinedSearch', value);
        }
      }
    },
    methods: mapActions('search', ['search'])
  };
</script>

<style scoped>
  .fullwidth {
    width: 100%;
  }

  .section {
    padding: 1rem 1.5rem;
  }
</style>
