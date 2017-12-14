<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Company Information</h1>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Name</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    :class="{ input: true, 'is-danger': !validation.Name }"
                    type="text"
                    placeholder="Name"
                    v-model.trim="company.Name"
                  />
                </p>
                <p class="help is-danger" v-show="!validation.Name">
                  Name is required.
                </p>
              </div>

              <Selectbox
                placeholder="Type"
                type="CompanyType"
                v-model="company.Type"
              />
            </div>
          </div>

          <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Registration</label>
              </div>
              <div class="field-body">
                <recruiter-lookup v-model="company.Recruiter" />

                <div class="field">
                  <p class="control is-expanded">
                    <input
                      class="input"
                      type="date"
                      placeholder="Registration Date"
                      v-model="company.RegistrationDate"
                    />
                  </p>
                </div>

                <Selectbox
                  placeholder="Source"
                  type="CompanySource"
                  v-model="company.Source"
                />
              </div>
            </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Industries</h1>
          <edit-codes type="Industry" :codes="company.Industry" @codesChanged="handleCodesChange" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <h1 class="title is-6">Phones</h1>
          <phones-edit :phones="company.Phones" @phoneChanged="handlePhoneChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-6">Emails</h1>
          <emails-edit :emails="company.Emails" @emailChanged="handleEmailChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-6">Addresses</h1>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="buttons">
        <span class="button is-primary" @click.prevent="handleSubmit">Save changes</span>
        <span class="button" @click.prevent="handleCancel">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { PhonesEdit } from '../phones';
  import { EmailsEdit } from '../emails';
  import { EditCodes } from '../codes';

  export default {
    name: 'CompanyEdit',
    components: { PhonesEdit, EmailsEdit, EditCodes },
    props: ['id'],
    data() {
      return {
        company: {
          Name: '',
          Type: '',
          Source: '',
          RegistrationDate: '',
          Phones: [],
          Emails: [],
          Addresses: [],
          Recruiter: {
            id: '',
            Name: ''
          }
        }
      };
    },
    mounted() {
      this.unsubscribe = firestore.collection('Company')
        .doc(this.id)
        .onSnapshot(doc => {
          this.company = doc && Object.assign(this.company, doc.data());
        });
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    computed: {
      validation() {
        return {
          Name: !!this.company.Name
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
      handleCodesChange(codes) {
        this.company = Object.assign({}, this.company, { Industry: codes });
      },
      handlePhoneChange(phones) {
        this.company = Object.assign({}, this.company, { Phones: phones });
      },
      handleEmailChange(emails) {
        this.company = Object.assign({}, this.company, { Emails: emails });
      },
      handleSubmit() {
        if (this.isValid) {
          this.$emit('save', this.company);
        }
      },
      handleCancel() {
        this.$emit('cancel');
      }
    }
  };
</script>
