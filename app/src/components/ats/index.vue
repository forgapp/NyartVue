<template>
  <div class="ats columns is-gapless is-marginless">
    <div class="column is-4">
      <div class="columns is-mobile is-gapless">
        <div class="column">
          <router-link :to="`/details/${type.toLowerCase()}/${label.id}`">{{ label.text }}</router-link>
          <p>opened for {{ openedDays }} days</p>
        </div>
        <div class="column has-text-centered">
          <p v-if="status.isPlaced" class="tag is-success">Placed</p>
          <p v-if="status.isBackout" class="tag is-danger">Backout</p>
          <p v-if="status.isRejected" class="tag is-danger">Rejected</p>
        </div>
        <div class="column has-text-centered">
          <div class="field is-grouped">
            <p v-if="status.inProgress" class="control">
              <next-step id="id" :process="process">
                <i class="fa fa-play" aria-hidden="true"></i>
              </next-step>
            </p>
            <unreject-button v-if="process.IsRejected" :id="process.id" label="label" />
            <reject-button v-else :id="process.id" label="label" />
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="columns is-gapless steps">
        <step :step="process.Application" :is-rejected="process.IsRejected">
          <p>Application</p>
        </step>
        <step :step="process.Submittal" :is-rejected="process.IsRejected">
          <p>Submittal</p>
        </step>
        <step :step="process.CCM1" :is-rejected="process.IsRejected">
          <p>CCM1</p>
        </step>
        <step :step="process.CCM" :is-rejected="process.IsRejected">
          <p>CCM+</p>
        </step>
        <step :step="process.Offer" :is-rejected="process.IsRejected">
          <p>Offer</p>
        </step>
        <step :step="process.Placement" :is-rejected="process.IsRejected">
          <p>Placement</p>
        </step>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { differenceFromToday } from '@/lib/date';
  import NextStep from './nextStep';
  import Step from './step';
  import * as Rejection from './rejection';

  @Component({
    components: { Step, NextStep, ...Rejection }
  })
  class Ats extends Vue {
    @Prop() type
    @Prop() process

    get isJob() {
      return this.type.toLowerCase() === 'job';
    }

    get label() {
      const isJob = this.isJob;
      const { Job, Candidate } = this.process;

      return {
        text: isJob ? Job.Title : Candidate.Name,
        id: isJob ? Job.id : Candidate.id
      };
    }

    get status() {
      const isPlaced = !!this.process.Placement;
      const isBackout = !!this.process.Backout;

      return {
        inProgress: !process.IsRejected && !isPlaced && !isBackout,
        isPlaced: isPlaced && !isBackout,
        isBackout,
        isRejected: this.process.IsRejected
      };
    }

    get openedDays() {
      const registrationDate = new Date(this.process.RegistrationDate);

      return differenceFromToday(registrationDate);
    }
  }

  export default Ats;
</script>

<style scoped>
  .ats {
    padding-top: 0.5rem;
  }

  .ats:not(:last-child) {
    border-bottom: 1px solid lightgrey;
    padding-bottom: 0.5rem;
  }
</style>

<style>
  .steps {
    border: 1px solid hsla(0, 0%, 0%, 0.2);
  }

  .step {
    padding: 0.1rem 0.5rem !important;
    color: hsla(0, 0%, 0%, 0.40);
    border: 1px solid transparent;
  }

  .step.success {
    background: #00d1b2;
  }

  .step.rejected {
    background: #dbdbdb;
  }
</style>
