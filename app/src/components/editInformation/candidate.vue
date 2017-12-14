<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Personal Information</h1>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Name</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="First name"
                    v-model.trim="candidate.Firstname"
                  />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    :class="{ input: true, 'is-danger': !validation.Lastname }"
                    type="text"
                    placeholder="Last name"
                    v-model.trim="candidate.Lastname"
                  />
                </p>
                <p class="help is-danger" v-show="!validation.Lastname">
                  Lastname is required.
                </p>
              </div>
            </div>
          </div>
      
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Name (Kanji)</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="First name"
                    v-model.trim="candidate.FirstnameKanji"
                  />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="Last name"
                    v-model.trim="candidate.LastnameKanji"
                  />
                </p>
              </div>
            </div>
          </div>
          
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Date of Birth</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="date" placeholder="Date of Birth" v-model="candidate.Birthdate" />
                </p>
              </div>
            </div>
          </div>
        
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Nationality</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <SelectboxObject
                    placeholder="Nationality"
                    type="Nationality"
                    v-model="candidate.NationalityCode"
                    @labelChanged="handleNationalityChanged"
                  />
                </p>
              </div>
            </div>
          </div>
      
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Employment</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="Job Title"
                    v-model.trim="candidate.JobTitle"
                  />
                </p>
              </div>
        
              <company-lookup v-model="candidate.Company" />
        
              <Selectbox
                placeholder="Level"
                type="RoleLevel"
                v-model="candidate.RoleLevel"
              />
            </div>
          </div>
          
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Salary</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <currency-input v-model.number="candidate.Salary" placeholder="Salary" />
                </p>
                <p class="help">Type 'm' for million, 'k' for thousand.</p>
              </div>
            </div>
          </div>
          
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Registration</label>
            </div>
            <div class="field-body">
              <recruiter-lookup v-model="candidate.Recruiter" />
        
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="date"
                    placeholder="Registration Date"
                    v-model="candidate.RegistrationDate"
                  />
                </p>
              </div>
        
              <Selectbox
                placeholder="Source"
                type="CandidateSource"
                v-model="candidate.Source"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Languages</h1>
          <edit-languages v-model="candidate.Languages" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <h1 class="title is-6">Phones</h1>
          <phones-edit :phones="candidate.Phones" @phoneChanged="handlePhoneChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-6">Emails</h1>
          <emails-edit :emails="candidate.Emails" @emailChanged="handleEmailChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-6">Addresses</h1>
        </div>
      </div>
    </div>
    
    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <h1 class="title is-5">Industries</h1>
          <edit-codes type="Industry" :codes="candidate.Industry" @codesChanged="handleIndustryChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-5">Job Functions</h1>
          <edit-codes type="JobFunction" :codes="candidate.JobFunction" @codesChanged="handleJobFunctionChange" />
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
    name: 'CandidateEdit',
    components: { PhonesEdit, EmailsEdit, EditCodes, EditLanguages },
    props: [ 'id' ],
    data() {
      return {
        candidate: {
          Lastname: '',
          Firstname: '',
          FirstnameKanji: '',
          LastnameKanji: '',
          Nationality: '',
          NationalityCode: '',
          Birthdate: '',
          Source: '',
          JobTitle: '',
          Salary: '',
          Company: {
            id: '',
            Name: ''
          },
          Languages: [],
          Phones: [],
          Emails: [],
          Addresses: [],
          Industry: [],
          JobFunction: [],
          RoleLevel: '',
          RegistrationDate: '',
          Recruiter: {
            id: '',
            Name: ''
          }
        }
      };
    },
    mounted() {
      this.unsubscribe = firestore.collection('Candidate')
        .doc(this.id)
        .onSnapshot(doc => {
          this.candidate = doc && Object.assign(this.candidate, doc.data());
        });
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    computed: {
      validation() {
        return {
          Lastname: !!this.candidate.Lastname
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
      handleNationalityChanged(nationality) {
        this.candidate = Object.assign({}, this.candidate, { Nationality: nationality });
      },
      handleIndustryChange(codes) {
        this.candidate = Object.assign({}, this.candidate, { Industry: codes });
      },
      handleJobFunctionChange(codes) {
        this.candidate = Object.assign({}, this.candidate, { JobFunction: codes });
      },
      handlePhoneChange(phones) {
        this.candidate = Object.assign({}, this.candidate, { Phones: phones });
      },
      handleEmailChange(emails) {
        this.candidate = Object.assign({}, this.candidate, { Emails: emails });
      },
      handleSubmit() {
        if (this.isValid) {
          this.$emit('save', this.candidate);
        }
      },
      handleCancel() {
        this.$emit('cancel');
      }
    }
  };
</script>
