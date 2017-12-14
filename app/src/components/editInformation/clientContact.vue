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
                    v-model.trim="clientContact.Firstname"
                  />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    :class="{ input: true, 'is-danger': !validation.Lastname }"
                    type="text"
                    placeholder="Last name"
                    v-model.trim="clientContact.Lastname"
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
                    v-model.trim="clientContact.FirstnameKanji"
                  />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="Last name"
                    v-model.trim="clientContact.LastnameKanji"
                  />
                </p>
              </div>
            </div>
          </div>
          
          <!--<div class="field is-horizontal">-->
          <!--  <div class="field-label is-normal">-->
          <!--    <label class="label">Date of Birth</label>-->
          <!--  </div>-->
          <!--  <div class="field-body">-->
          <!--    <div class="field is-grouped">-->
          <!--      <p class="control is-expanded">-->
          <!--        <input class="input" type="date" placeholder="Date of Birth" v-model="clientContact.DateOfBirth" />-->
          <!--      </p>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--</div>-->
        
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
                    v-model="clientContact.NationalityCode"
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
                    v-model.trim="clientContact.JobTitle"
                  />
                </p>
              </div>
        
              <company-lookup v-model="clientContact.Company" />
        
              <Selectbox
                placeholder="Level"
                type="RoleLevel"
                v-model="clientContact.RoleLevel"
              />
            </div>
          </div>
          
          <!--<div class="field is-horizontal">-->
          <!--  <div class="field-label is-normal">-->
          <!--    <label class="label">Salary</label>-->
          <!--  </div>-->
          <!--  <div class="field-body">-->
          <!--    <div class="field">-->
          <!--      <p class="control is-expanded">-->
          <!--        <currency-input v-model.number="clientContact.Salary" placeholder="Salary" />-->
          <!--      </p>-->
          <!--      <p class="help">Type 'm' for million, 'k' for thousand.</p>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--</div>-->
          
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Registration</label>
            </div>
            <div class="field-body">
              <recruiter-lookup v-model="clientContact.Recruiter" />
        
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="date"
                    placeholder="Registration Date"
                    v-model="clientContact.RegistrationDate"
                  />
                </p>
              </div>
        
              <Selectbox
                placeholder="Source"
                type="clientContactSource"
                v-model="clientContact.Source"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Languages</h1>
          <edit-languages v-model="clientContact.Languages" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <h1 class="title is-6">Phones</h1>
          <phones-edit :phones="clientContact.Phones" @phoneChanged="handlePhoneChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-6">Emails</h1>
          <emails-edit :emails="clientContact.Emails" @emailChanged="handleEmailChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-6">Addresses</h1>
        </div>
      </div>
    </div>
    
    <!--<div class="box">-->
    <!--  <div class="columns">-->
    <!--    <div class="column is-4">-->
    <!--      <h1 class="title is-5">Industries</h1>-->
    <!--      <edit-codes type="Industry" :codes="clientContact.Industry" @codesChanged="handleIndustryChange" />-->
    <!--    </div>-->
    <!--    <div class="column is-4">-->
    <!--      <h1 class="title is-5">Job Functions</h1>-->
    <!--      <edit-codes type="JobFunction" :codes="clientContact.JobFunction" @codesChanged="handleJobFunctionChange" />-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->
    
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
    name: 'ClientContactEdit',
    components: { PhonesEdit, EmailsEdit, EditCodes, EditLanguages },
    props: [ 'id' ],
    data() {
      return {
        clientContact: {
          Lastname: '',
          Firstname: '',
          FirstnameKanji: '',
          LastnameKanji: '',
          Nationality: '',
          NationalityCode: '',
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
      this.unsubscribe = firestore.collection('ClientContact')
        .doc(this.id)
        .onSnapshot(doc => {
          this.clientContact = doc && Object.assign(this.clientContact, doc.data());
        });
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    computed: {
      validation() {
        return {
          Lastname: !!this.clientContact.Lastname
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
        this.clientContact = Object.assign({}, this.clientContact, { Industry: codes });
      },
      handleJobFunctionChange(codes) {
        this.clientContact = Object.assign({}, this.clientContact, { JobFunction: codes });
      },
      handlePhoneChange(phones) {
        this.clientContact = Object.assign({}, this.clientContact, { Phones: phones });
      },
      handleEmailChange(emails) {
        this.clientContact = Object.assign({}, this.clientContact, { Emails: emails });
      },
      handleSubmit() {
        if (this.isValid) {
          this.$emit('save', this.clientContact);
        }
      },
      handleCancel() {
        this.$emit('cancel');
      }
    }
  };
</script>