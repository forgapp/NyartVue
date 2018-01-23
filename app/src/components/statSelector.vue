<template>
  <div class="filter_container">
    <div v-if="!isFilterOpened">
      <div class="heading is-marginless">Filter <a class="has-text-info is-underline" @click.prevent="toggleFilter">(Change)</a></div>
      <div class="is-size-7">
        Stats for {{ recruiter.Name }} within {{ periods[period].label }}
      </div>
    </div>
    <form v-else>
      <div class="field">
        <label class="label is-small">Recruiter</label>
        <p class="control">
          <recruiter-lookup
            :value="recruiter"
            @input="recruiterChanged"
            is-small="true"
          />
        </p>
      </div>

      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <label class="label is-small">Period</label>
            <p class="control">
              <span class="select is-fullwidth is-small">
                <select :value="period" @change.lazy="handlePeriodChanged">
                  <option v-for="(availablePeriod, key) in periods" :key="key" :value="key">{{ availablePeriod.label }}</option>
                </select>
              </span>
            </p>
          </div>

          <div class="field">
            <label class="label is-small not-visible">Refresh</label>
            <div class="buttons is-centered">
              <button class="button is-small" @click.prevent="refresh">
                <span class="icon">
                  <i class="fa fa-refresh"></i>
                </span>
              </button>
              <button class="button is-small is-text" @click.prevent="toggleFilter">
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!--<div class="box">-->
    <!--<nav class="level is-mobile">-->
    <!--  <div class="level-left">-->
    <!--    <div class="level-item">-->
    <!--      <div class="field">-->
    <!--        <label class="label is-small">Period</label>-->
    <!--        <p class="control">-->
    <!--          <span class="select is-small">-->
    <!--            <select :value="period" @change.lazy="handlePeriodChanged">-->
    <!--              <option v-for="(availablePeriod, key) in periods" :key="key" :value="key">{{ availablePeriod.label }}</option>-->
    <!--            </select>-->
    <!--          </span>-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="level-item">-->
    <!--      <div class="field">-->
    <!--        <label class="label is-small">Recruiter</label>-->
    <!--        <p class="control">-->
    <!--          <recruiter-lookup-->
    <!--            :value="recruiter"-->
    <!--            @input="recruiterChanged"-->
    <!--            is-small="true"-->
    <!--          />-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="level-item">-->
    <!--      <div class="field">-->
    <!--        <label class="label is-small not-visible">Refresh</label>-->
    <!--        <button class="button is-small" @click="refresh">-->
    <!--          <span class="icon">-->
    <!--            <i class="fa fa-refresh"></i>-->
    <!--          </span>-->
    <!--        </button>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</nav>-->
	<!--</div>-->
</template>

<script>
  import { periods } from '@/lib/date';
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class StatSelector extends Vue {
    @Prop({}) period
    @Prop({}) recruiter
    isFilterOpened = false;

    toggleFilter() {
      this.isFilterOpened = !this.isFilterOpened;
    }

    periods = periods

    handlePeriodChanged(event) {
      const { value } = event.target;
      this.periodChanged(value);
    }

    @Emit()
    recruiterChanged(recruiter) {}

    @Emit()
    periodChanged(period) {}

    @Emit()
    refresh() {
      this.toggleFilter();
    }
  }

  export default StatSelector;
</script>

<style scoped>
  .not-visible {
    visibility: hidden;
  }

  .filter_container {
    padding-bottom: 1rem;
  }
</style>
