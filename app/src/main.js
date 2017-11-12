import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';

import Spinner from './components/spinner';
import Selectbox from './components/selectbox';
import { Lookup, CompanyLookup, RecruiterLookup, CompanyContactLookup } from './components/lookup';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(Vuex);
Vue.component('Spinner', Spinner);
Vue.component('Selectbox', Selectbox);
Vue.component('Lookup', Lookup);
Vue.component('CompanyLookup', CompanyLookup);
Vue.component('RecruiterLookup', RecruiterLookup);
Vue.component('CompanyContactLookup', CompanyContactLookup);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(store),
  render: h => h(App)
});
