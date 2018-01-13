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
            <p v-if="status.inCCM" class="control">
              <next-step id="id" :process="process" is-new-ccm="true">
                <span class="icon">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
                <span>CCM</span>
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
        <step :step="stages.Application" :is-rejected="status.IsRejected">
          <p>Application</p>
        </step>
        <step :step="stages.Submittal" :is-rejected="status.IsRejected">
          <p>Submittal</p>
        </step>
        <step :step="stages.CCM1" :is-rejected="status.IsRejected">
          <p>CCM1</p>
        </step>
        <step :step="stages.CCM" :is-rejected="status.IsRejected">
          <p>CCM{{ ccmNumber }}</p>
        </step>
        <step :step="stages.Offer" :is-rejected="status.IsRejected">
          <p>Offer</p>
        </step>
        <step :step="stages.Placement" :is-rejected="status.IsRejected">
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
      const isRejected = this.process.IsRejected;
      const isPlaced = !!this.process.Placement;
      const isBackout = !!this.process.Backout;
      const inProgress = !isRejected && !isPlaced && !isBackout;

      return {
        inProgress,
        inCCM: inProgress && !!this.process.CCM && !this.process.Offer,
        isPlaced: isPlaced && !isBackout,
        isBackout,
        isRejected: isRejected
      };
    }

    get stages() {
      const CCM = this.process.CCM ? this.process.CCM.sort((prev, next) => {
        return prev.Number > next.Number;
      }) : null;

      return {
        Application: this.process.Application,
        Submittal: this.process.Submittal,
        CCM1: CCM ? CCM[0] : null,
        CCM: CCM && CCM.length > 1 ? CCM[CCM.length - 1] : null,
        Offer: this.process.Offer,
        Placement: this.process.Placement
      };
    }

    get ccmNumber() {
      return this.stages.CCM && this.stages.CCM.Number;
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
