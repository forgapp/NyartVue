<template>
  <form @submit.prevent="handleSave">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Position</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input
              :class="{ input: true, 'is-danger': !validation.JobTitle }"
              type="text"
              placeholder="Job Title"
              v-model.trim="JobTitle"
            />
          </p>
          <p class="help is-danger" v-show="!validation.JobTitle">
            Job title is required.
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded">
            <input
              class="input"
              type="number"
              placeholder="Headcount"
              v-model.number="Headcount"
            />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Employer</label>
      </div>
      <company-contact-lookup
        :company="Company"
        :contact="ClientContact"
        @companyChanged="handleCompanyChange"
      />
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Salary</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input"
              type="number"
              placeholder="Minimum"
              v-model.number="SalaryMinimun"
            />
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded">
            <input
              class="input"
              type="number"
              placeholder="Maximum"
              v-model.number="SalaryMaximun"
            />
          </p>
        </div>
      </div>
    </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Registration</label>
    </div>
    <div class="field-body">
      <recruiter-lookup v-model="Recruiter" />

      <div class="field">
        <p class="control is-expanded">
          <input
            class="input"
            type="date"
            placeholder="Registration Date"
            v-model="RegistrationDate"
          />
        </p>
      </div>

      <Selectbox
        placeholder="Source"
        type="JobSource"
        v-model="Source"
      />
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
  import { isEmpty } from '@/lib/utils';
  import { formatdateForInput } from '@/lib/date';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'jobForm',
    props: ['recruiter', 'isSaving'],
    data: function () {
      return {
        JobTitle: '',
        Headcount: 1,
        Company: {
          id: '',
          Name: ''
        },
        ClientContact: {
          id: '',
          Name: ''
        },
        SalaryMinimun: 0,
        SalaryMaximun: 0,
        RegistrationDate: formatdateForInput(new Date()),
        Source: '',
        Recruiter: {
          id: this.recruiter.id,
          Name: this.recruiter.displayName
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
          JobTitle: !!this.JobTitle
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
      handleCompanyChange: function (company) {
        this.Company = Object.assign(
          { ref: firestore.collection('Company').doc(company.id) },
          company
        );
      },
      handleSave: function (event) {
        if (this.isValid) {
          const company = Object.keys(this.$data)
            .filter(key => !isEmpty(this.$data[key]))
            .reduce((aggr, key) =>
              Object.assign({}, aggr, { [key]: this.$data[key] }), {}
            );

          this.$emit('addRecord', company);
        }
      },
      cancel: function () {
        this.$emit('cancel');
      }
    }
  };
</script>
