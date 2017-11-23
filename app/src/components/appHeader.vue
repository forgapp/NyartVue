<template>
  <div class="header">
    <div class="container is-fluid top-row">
      <div class="brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/logo.png" alt="Nyart: Not Yet Another Recruiting Tool">
        </router-link>
      </div>
      <div class="search">
        <search-input />
      </div>
    </div>
    <nav class="navbar has-shadow">
      <div class="container one-row">
        <div class="navbar-tabs">
          <router-link class="navbar-item is-tab" active-class="is-active" to="/whiteboard">
            Whiteboard
          </router-link>
          <router-link class="navbar-item is-tab" active-class="is-active" to="/search">
            Search
          </router-link>
          <router-link class="navbar-item is-tab" active-class="is-active" to="/new">
            New
          </router-link>
          <a class="navbar-item is-tab is-hidden" href="https://bulma.io/documentation/components/card/">
            History
          </a>
        </div>

        <div class="dropdown is-right is-hoverable profile">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>{{ user.displayName }}</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <router-link v-if="isAdmin" class="dropdown-item" active-class="is-active" to="/admin">
                Administration
              </router-link>
              <a class="dropdown-item" @click.prevent="signOut">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import SearchInput from './search/input';

  export default {
    name: 'AppHeader',
    components: { SearchInput },
    props: ['user', 'isAdmin', 'signOut']
  };
</script>

<style scoped>
  .header {
    padding-top: 0.5rem;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 101;
  }

  .top-row {
    display: flex;
    align-items: center;
  }

  .brand {
    line-height: 1.5;
    padding: 0rem 1rem;
    position: relative;
  }

  .search {
    flex-grow: 0.5;
  }

  .profile {
    margin-right: 1rem;
  }

  .profile button {
    border-color: transparent;
  }

  .one-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>