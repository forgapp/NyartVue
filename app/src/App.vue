<template>
  <div id="app">
    <Spinner v-if="isLoading" />
    <Login v-else-if="!isLoading && !isLoggedIn" />
    <div id="app-container" v-else-if="!isLoading && isLoggedIn && isAuthorized">
      <div class="header">
        <app-header :user="user" :isAdmin="isAdmin" :signOut="handleSignOut" />
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
    <div v-else class="notification is-danger">
      You are not authorized to use this application.
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { auth } from '@/lib/firebase';
  import AppHeader from './components/appHeader';
  import Login from './components/login';

  export default {
    name: 'app',
    components: { AppHeader, Login },
    beforeMount() { this.login(); },
    methods: {
      ...mapActions('app', ['login']),
      handleSignOut: function () {
        auth.signOut();
      }
    },
    computed: {
      ...mapState('app', [
        'isLoading',
        'isLoggedIn',
        'user',
        'isAuthorized',
        'isAdmin'
      ])
    }
  };
</script>

<style>
  * {
  	box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
  }

  html, body {
    background: #fafafa;
    margin: 0;
    padding: 0;
    overflow: hidden;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  }

  #app-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    flex: 0 0 auto;
  }

  .main-content {
    background: whitesmoke;
    flex: 1 1 auto;
    height: 100%;
    overflow: hidden;
  }

  #app .CodeMirror {
    height: auto;
  }

  .is-fullwidth {
    width: 100%;
  }

  .is-fullheight {
    height: 100%;
  }
</style>
