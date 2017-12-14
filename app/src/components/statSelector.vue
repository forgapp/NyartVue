<template>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <label class="label is-small">Period</label>
            <p class="control">
              <span class="select is-small">
                <select :value="selectedPeriods" @change.lazy="handleChangePeriod">
                  <option v-for="(period, key) in periods" :key="key" :value="key">{{ period.label }}</option>
                </select>
              </span>
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label class="label is-small">Recruiter</label>
            <p class="control">
              <recruiter-lookup v-model="Recruiter" is-small="true" />
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label class="label is-small not-visible">Refresh</label>
            <button class="button is-small" @click="refresh">
              <span class="icon">
                <i class="fa fa-refresh"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
	</div>
</template>

<script>
  import { periods } from '@/lib/date';

  export default {
    name: 'statSelector',
    props: [ 'selectedPeriods' ],
    data() {
      return { periods: periods, Recruiter: {} };
    }
  };
</script>

<style scoped>
  .not-visible {
    visibility: hidden;
  }
</style>
