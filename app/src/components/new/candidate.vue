<template>
  <form v-on:submit.prevent="handleSave">
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
              v-model.trim="Firstname"
            />
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded">
            <input
              :class="{ input: true, 'is-danger': !validation.Lastname }"
              type="text"
              placeholder="Last name"
              v-model.trim="Lastname"
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
              v-model.trim="FirstnameKanji"
            />
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Last name"
              v-model.trim="LastnameKanji"
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
            v-model.trim="JobTitle"
          />
        </p>
      </div>

      <company-lookup v-model="Company" />

      <Selectbox
        placeholder="Level"
        type="RoleLevel"
        v-model="RoleLevel"
      />
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
        type="CandidateSource"
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
    name: 'candidateForm',
    props: ['recruiter', 'isSaving'],
    data: function () {
      return {
        Lastname: '',
        Firstname: '',
        FirstnameKanji: '',
        LastnameKanji: '',
        Source: '',
        JobTitle: '',
        Company: {
          id: '',
          Name: ''
        },
        RoleLevel: '',
        RegistrationDate: formatdateForInput(new Date()),
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
          Lastname: !!this.Lastname
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
      handleSave: function (event) {
        if (this.isValid) {
          const candidate = Object.keys(this.$data)
            .filter(key => !isEmpty(this.$data[key]))
            .reduce((aggr, key) =>
              Object.assign({}, aggr, { [key]: this.$data[key] }), {}
            );

          this.$emit('addRecord', candidate);
        }
      },
      cancel: function () {
        this.$emit('cancel');
      }
    }
  };
</script>