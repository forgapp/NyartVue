<template>
  <form @submit.prevent="handleSave">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Candidate</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <candidate-lookup :value="process.Candidate" @input="handleCandidateChange" />
            <p class="help is-danger" v-show="!validation.Candidate">
              Candidate is required.
            </p>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Job</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <job-lookup :value="process.Job" @input="handleJobChange" />
            <p class="help is-danger" v-show="!validation.Job">
              Job is required.
            </p>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Registration</label>
      </div>
      <div class="field-body">
        <recruiter-lookup :value="process.Recruiter" @input="handleRecruiterChange" />

        <div class="field">
          <p class="control is-expanded">
            <input
              class="input"
              type="date"
              placeholder="Process Start Date"
              v-model="process.RegistrationDate"
              @change.lazy="handleRegistrationdateChange"
            />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label"></div>
      <div class="field-body">
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" :class="saveButtonClass" :disabled="!isValid || isSaving">
              Save
            </button>
          </div>
          <div class="control">
            <button class="button" type="button" @click.prevent="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
  import { CandidateLookup, JobLookup } from '../lookup';

  @Component({
    components: { CandidateLookup, JobLookup }
  })
  class NewProcessForm extends Vue {
    @Prop() process
    @Prop() isSaving

    get saveButtonClass() {
      return {
        button: true,
        'is-primary': true,
        'is-loading': this.isSaving
      };
    }

    get validation() {
      return {
        Candidate: !!this.process.Candidate.Name,
        Job: !!this.process.Job.Title
      };
    }

    get isValid() {
      const validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key];
      });
    }

    handleCandidateChange(candidate) {
      this.processUpdated({
        Candidate: candidate
      });
    }

    handleJobChange(job) {
      this.processUpdated({
        Job: job
      });
    }

    handleRecruiterChange(recruiter) {
      this.processUpdated({
        Recruiter: recruiter
      });
    }

    handleRegistrationdateChange(event) {
      const { value } = event.target;
      const application = Object.assign({}, this.process.Application, {
        StageDate: value
      });

      this.processUpdated({
        Application: application,
        RegistrationDate: value
      });
    }

    handleSave(event) {
      if (this.isValid) {
        this.save();
      }
    }

    @Emit() processUpdated(process) {}
    @Emit() save() {}
    @Emit() cancel() {}
  }

  export default NewProcessForm;
</script>
