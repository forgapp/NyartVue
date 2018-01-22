<template>
  <div class="columns is-multiline">
    <div class="notification is-danger is-fullwidth" v-if="error">
      Error while searching.<br />
      Check your network connection.
     </div>
    <div class="notification is-warning is-fullwidth" v-if="this.total === 0">
      No Results Found.
    </div>
    <div class="column is-half" v-for="item in results" v-if="total > 0" :key="item._id">
      <dynamic-card :key="item._id" :index="item._index" :hit="item" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { DynamicCard } from '@/components/cards';

  export default {
    name: 'searchResults',
    components: { DynamicCard },
    computed: mapState('search', ['results', 'total', 'error'])
  };
</script>
