<template>
  <div class="ats">
    <div class="columns no-margin-bottom">
      <div class="column is-4">
        <div class="level is-mobile small-margin">
          <div class="level-left">
            <div class="level-item">
              <router-link :to="`/details/${type.toLowerCase()}/${label.id}`">{{ label.text }}</router-link>
            </div>
          </div>
          <div class="level-right">
            <p v-if="status.isPlaced" class="tag is-success">Placed</p>
            <p v-else-if="status.isBackout" class="tag is-danger">Backout</p>
            <p v-else-if="status.isRejected" class="tag is-danger">Rejected</p>
            <p v-else class="tag is-info">In Progress</p>
          </div>
        </div>
        <div class="buttons">
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
          <div v-if="!status.isPlaced">
            <unreject-button v-if="status.isRejected" :id="process.id" label="label" />
           <reject-button v-else :id="process.id" label="label" />
         </div>
        </div>
      </div>
      <div class="column">
        <div class="columns is-gapless steps is-fullheight">
          <step :step="stages.Application" :is-rejected="status.isRejected">
            <p>Application</p>
          </step>
          <step :step="stages.Submittal" :is-rejected="status.isRejected">
            <p>Submittal</p>
          </step>
          <step :step="stages.CCM1" :is-rejected="status.isRejected">
            <p>CCM1</p>
          </step>
          <step :step="stages.CCM" :is-rejected="status.isRejected">
            <p>CCM{{ ccmNumber }}</p>
          </step>
          <step :step="stages.Offer" :is-rejected="status.isRejected">
            <p>Offer</p>
          </step>
          <step :step="stages.Placement" :is-rejected="status.isRejected">
            <p>Placement</p>
          </step>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p v-if="status.inProgress">opened for {{ openedDays }} days</p>
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
      const isRejected = this.process.Status === 'Rejected';
      const isPlaced = !!this.process.Placement;
      const isBackout = !!this.process.Backout;
      const inProgress = !isRejected && !isPlaced && !isBackout;

      return {
        inProgress,
        inCCM: inProgress && !!this.process.CCM && !this.process.Offer,
        isPlaced: isPlaced && !isBackout,
        isBackout,
        isRejected
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
  .ats:not(:last-child) {
    border-bottom: 1px solid lightgrey;
    margin-bottom: 1rem;
  }

  .no-margin-bottom {
    margin-bottom: 0;
  }

  .small-margin {
    margin-bottom: 0.5rem;
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
