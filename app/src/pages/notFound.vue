<template>
  <main class="is-flex-mobile is-flex-tablet-only is-flex-desktop-only is-flex-widescreen flex-is-align-items-center flex-is-justify-content-center isCentered">
    <div class="columns">
      <div class="column flex-is-justify-content-center flex-is-align-items-center">
        <div class="content">
          <h1 class="title is-1 has-text-centered is-marginless error-header isRed">40x</h1>
          <h2 class="title has-text-centered color-is-black">Not Found</h2>
          <p class="has-text-centered content">
            It's looking like you may have taken a wrong turn.<br />
            Don't worry... it happens to the best of us
          </p>
          <div class="has-text-centered">
            <router-link class="has-text-centered button isPurpleOutlined" to="/" style="margin-left:auto;margin-right:auto;">To Front Page</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default { name: 'notFound' };
</script>

<style scoped>
  h1.isRed {
  	color: #ff3860;
  }

  .content {
      color: #69707a;
      font-size: 0.9rem;
  }

  .isPurpleOutlined {
  	background-color: transparent;
      border-color: #847bb9;
      color: #847bb9;
  }

  .isPurpleOutlined:hover {
  	background-color: #847bb9;
      border-color: #847bb9;
      color: #fff;
  }

  .isCentered {
  	justify-content: center;
  }
</style>