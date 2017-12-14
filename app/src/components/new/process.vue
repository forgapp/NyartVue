<template>
  <form @submit.prevent="handleSave">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Candidate</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <candidate-lookup v-model="process.Candidate" />
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
            <job-lookup v-model="process.Job" />
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
        <recruiter-lookup v-model="process.Recruiter" />

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
            <button class="button" type="button" @click.prevent="handleCancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { isEmpty } from '@/lib/utils';
  import { formatdateForInput } from '@/lib/date';
  import { CandidateLookup, JobLookup } from '../lookup';

  export default {
    name: 'newProcessForm',
    components: { CandidateLookup, JobLookup },
    props: ['recruiter', 'isSaving'],
    data() {
      return {
        process: {
          Candidate: {
            Name: '',
            id: ''
          },
          Job: {
            Title: '',
            id: ''
          },
          Status: 'In Progress',
          Application: {
            StageDate: formatdateForInput(new Date())
          },
          Recruiter: {
            id: this.recruiter.id,
            Name: this.recruiter.displayName
          },
          RegistrationDate: formatdateForInput(new Date())
        }
      };
    },
    computed: {
      saveButtonClass() {
        return {
          button: true,
          'is-primary': true,
          'is-loading': this.isSaving
        };
      },
      validation() {
        return {
          Candidate: !!this.process.Candidate.Name,
          Job: !!this.process.Job.Title
        };
      },
      isValid() {
        var validation = this.validation;
        return Object.keys(validation).every(function (key) {
          return validation[key];
        });
      }
    },
    methods: {
      handleRegistrationdateChange(event) {
        const { value } = event.target;

        this.Application.StageDate = value;
      },
      handleSave: function (event) {
        if (this.isValid) {
          const process = Object.keys(this.process)
            .filter(key => !isEmpty(this.process[key]))
            .reduce((aggr, key) =>
              Object.assign({}, aggr, { [key]: this.process[key] }), {}
            );

          this.$emit('save', process);
        }
      },
      handleCancel: function () {
        this.$emit('cancel');
      }
    }
  };
</script>
