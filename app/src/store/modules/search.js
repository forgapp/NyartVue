import Elastic from '@/lib/elastic';

const UPDATE_SEARCH_TEXT = 'updateSearchText';
const UPDATE_PREDEFINED_SEARCH = 'updatePredefinedSearch';
const REQUEST_SEARCH = 'requestSearch';
const SET_SEARCH_RESULTS = 'setSearchResult';
const CATCH_SEARCH_ERROR = 'catchSearchError';

const state = {
  isSearching: false,
  predefinedSearch: '',
  searchText: '',
  total: null,
  results: null,
  error: null
};

const mutations = {
  [UPDATE_SEARCH_TEXT](state, searchText) {
    state.searchText = searchText;
    state.predefinedSearch = '';
  },
  [UPDATE_PREDEFINED_SEARCH](state, { predefinedSearch, text }) {
    state.predefinedSearch = predefinedSearch;
    state.searchText = text;
  },
  [REQUEST_SEARCH](state) {
    state.isSearching = true;
    state.results = null;
    state.error = null;
    state.total = null;
  },
  [SET_SEARCH_RESULTS](state, { hits, total }) {
    state.isSearching = false;
    state.results = hits;
    state.total = total;
  },
  [CATCH_SEARCH_ERROR](state, error) {
    state.isSearching = false;
    state.error = error;
  }
};

const actions = {
  search({ commit, state }) {
    commit(REQUEST_SEARCH);

    const elastic = new Elastic();

    elastic
      // .setIndex('record')
      .size(250)
      .query(state.searchText)
      .search()
      .then(results => {
        const { hits, total } = results.hits;

        setTimeout(() => {
          commit(SET_SEARCH_RESULTS, { hits, total });
        }, 250);
      })
      .catch(err => {
        commit(CATCH_SEARCH_ERROR, err);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
