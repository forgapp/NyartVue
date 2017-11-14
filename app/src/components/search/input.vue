<template>
  <form @submit.prevent="search">
    <div class="field has-addons">
      <p class="control">
        <span class="select">
          <select v-model="predefinedSearch">
            <option value="">Views</option>
            <option value="MY_CANDIDATES">My Candidates</option>
            <option value="MY_JOBS">My Jobs</option>
            <option value="MY_COMPANIES">My Companies</option>
            <option value="MY_CONTACTS">My Contacts</option>
          </select>
        </span>
      </p>
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Search" v-model="searchText" />
      </p>
      <p class="control">
        <button type="Submit" class="button is-primary">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </p>
    </div>
  </form>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'SearchInput',
    computed: {
      ...mapState('search', [ 'isSearching' ]),
      ...mapState('app', [ 'user' ]),
      definedSearch: function () {
        return {
          MY_CANDIDATES: `Recruiter.Name:"${this.user.displayName}" AND _type:Candidate`,
          MY_JOBS: `Recruiter.Name:"${this.user.displayName}" AND _type:Job`,
          MY_COMPANIES: `Recruiter.Name:"${this.user.displayName}" AND _type:Company`,
          MY_CONTACTS: `Recruiter.Name:"${this.user.displayName}" AND _type:ClientContact`
        };
      },
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
          this.$store.commit('search/updatePredefinedSearch', {
            predefinedSearch: value,
            text: this.definedSearch[value]
          });
        }
      }
    },
    methods: mapActions('search', ['search'])
  };
</script>
