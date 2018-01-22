<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <stat-selector selectedPeriods="THIS_FQ" />
      <div>Home</div>
      <div class="columns is-gapless">
        <div class="column">
          <div class="stat">
            <p class="heading">Tweets</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="column">
          <div class="stat">
            <p class="heading">Candidates</p>
            <p class="title">6</p>
          </div>
        </div>
        <div class="column">
          <div class="stat">
            <p class="heading">Candidates</p>
            <p class="title">6</p>
          </div>
        </div>
        <div class="column">
          <div class="stat">
            <p class="heading">Candidates</p>
            <p class="title">6</p>
          </div>
        </div>
      </div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Last</div>
    </div>
  </div>
</template>

<script>
  import StatSelector from '@/components/statSelector';

  export default {
    name: 'home',
    components: { StatSelector }
  };
</script>

<style>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
