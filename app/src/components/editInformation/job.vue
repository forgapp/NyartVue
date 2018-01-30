<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h1 class="title  is-5">Job Information</h1>
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
                    v-model.trim="job.JobTitle"
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
                    v-model.number="job.Headcount"
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
              :company="job.Company"
              :contact="job.ClientContact"
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
                  <currency-input v-model.number="job.SalaryMinimun" placeholder="Minimum" />
                </p>
                <p class="help">Type 'm' for million, 'k' for thousand.</p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <currency-input v-model.number="job.SalaryMaximun" placeholder="Maximum" />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Work Location</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="WorkLocation" v-model.trim="job.WorkLocation" />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Registration</label>
            </div>
            <div class="field-body">
              <recruiter-lookup v-model="job.Recruiter" />

              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="date"
                    placeholder="Registration Date"
                    v-model="job.RegistrationDate"
                  />
                </p>
              </div>

              <Selectbox
                placeholder="Source"
                type="JobSource"
                v-model="job.Source"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Languages</h1>
          <edit-languages v-model="job.Languages" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <h1 class="title is-5">Industries</h1>
          <edit-codes type="Industry" :codes="job.Industry" @codesChanged="handleIndustryChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-5">Job Functions</h1>
          <edit-codes type="JobFunction" :codes="job.JobFunction" @codesChanged="handleJobFunctionChange" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="buttons">
        <span class="button is-primary" @click.prevent="handleSubmit" :disabled="!isValid">Save changes</span>
        <span class="button" @click.prevent="handleCancel">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { EditLanguages } from '../languages';
  import { PhonesEdit } from '../phones';
  import { EmailsEdit } from '../emails';
  import { EditCodes } from '../codes';

  export default {
    name: 'jobEdit',
    components: { PhonesEdit, EmailsEdit, EditCodes, EditLanguages },
    props: [ 'id' ],
    data() {
      return {
        job: {
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
          Source: '',
          Languages: [],
          Industry: [],
          JobFunction: [],
          RegistrationDate: '',
          Recruiter: {
            id: '',
            Name: ''
          }
        }
      };
    },
    mounted() {
      this.unsubscribe = firestore.collection('Job')
        .doc(this.id)
        .onSnapshot(doc => {
          this.job = doc && Object.assign(this.job, doc.data());
        });
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    computed: {
      validation() {
        return {
          JobTitle: !!this.job.JobTitle
        };
      },
      isValid() {
        const validation = this.validation;
        return Object.keys(validation).every(function (key) {
          return validation[key];
        });
      }
    },
    methods: {
      handleIndustryChange(codes) {
        this.job = Object.assign({}, this.job, { Industry: codes });
      },
      handleJobFunctionChange(codes) {
        this.job = Object.assign({}, this.job, { JobFunction: codes });
      },
      handleCompanyChange(company) {
        this.job.Company = company;
      },
      handleContactChange(contact) {
        this.job.ClientContact = contact;
      },
      handleSubmit() {
        if (this.isValid) {
          this.$emit('save', this.job);
        }
      },
      handleCancel() {
        this.$emit('cancel');
      }
    }
  };
</script>
