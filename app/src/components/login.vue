<template>
  <div class="loginForm">
    <button
      type="button"
      class="button is-primary is-outlined is-large"
      @click="handleGoogleSignIn"
    >
      <span class="icon">
        <i class="fa fa-google"></i>
      </span>
      <span>Sign In with Google</span>
    </button>
  </div>
</template>

<script>
  import { auth, googleAuthProvider } from '@/lib/firebase';

  export default {
    name: 'login',
    methods: {
      handleGoogleSignIn(event) {
        event.preventDefault();
        auth.signInWithRedirect(googleAuthProvider);
      }
    }
  };
</script>

<style scoped>
  .loginForm {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>