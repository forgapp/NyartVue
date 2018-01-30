<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container is-fluid header-container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <span @click="handleLogoClick">
            <img src="../assets/logo.png" alt="Nyart: Not Yet Another Recruiting Tool">
          </span>
        </router-link>

        <div :class="burgerbuttonClass" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div :class="navbarMenuClass">
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field">
              <search-input />
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-tabs">
            <router-link class="navbar-item is-tab" active-class="is-active" to="/whiteboard">
              <span @click="toggleMenu">Whiteboard</span>
            </router-link>
            <router-link class="navbar-item is-tab" active-class="is-active" to="/search">
              <span @click="toggleMenu">Search</span>
            </router-link>
            <router-link class="navbar-item is-tab" active-class="is-active" to="/new">
              <span @click="toggleMenu">New</span>
            </router-link>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ user.displayName }}
            </a>

            <div class="navbar-dropdown">
              <router-link v-if="isAdmin" class="dropdown-item" active-class="is-active" to="/admin">
                <span @click="toggleMenu">Administration</span>
              </router-link>
              <a class="dropdown-item" @click.prevent="signOut">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import SearchInput from './search/input';

  @Component({
    components: { SearchInput }
  })
  class AppHeader extends Vue {
    @Prop() user
    @Prop() isAdmin
    @Prop() signOut
    isOpen = false;

    get burgerbuttonClass() {
      return {
        'navbar-burger': true,
        'is-active': this.isOpen
      };
    }

    get navbarMenuClass() {
      return {
        'navbar-menu': true,
        'is-active': this.isOpen
      };
    }

    toggleMenu() { this.isOpen = !this.isOpen; }

    handleLogoClick() {
      if (this.isOpen) {
        this.toggleMenu();
      }
    }
  }

  export default AppHeader;
</script>
