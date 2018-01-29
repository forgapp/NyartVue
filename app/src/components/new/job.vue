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
        @contactChanged="handleContactChange"
      />
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Salary</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <currency-input v-model.number="SalaryMinimun" placeholder="Minimum" />
          </p>
          <p class="help">Type 'm' for million, 'k' for thousand.</p>
        </div>
        <div class="field">
          <p class="control is-expanded">
            <currency-input v-model.number="SalaryMaximun" placeholder="Maximum" />
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
        Status: 'Open',
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
        this.Company = company;
      },
      handleContactChange: function (contact) {
        this.ClientContact = contact;
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
