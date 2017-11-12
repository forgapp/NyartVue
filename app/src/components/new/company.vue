<template>
  <form @submit.prevent="handleSave">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Company</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input
              :class="{ input: true, 'is-danger': !validation.Name }"
              type="text"
              placeholder="Name"
              v-model.trim="Name"
            />
          </p>
          <p class="help is-danger" v-show="!validation.Name">
            Name is required.
          </p>
        </div>

        <Selectbox
          placeholder="Type"
          type="CompanyType"
          v-model="Type"
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
        type="CompanySource"
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
    name: 'companyForm',
    props: ['recruiter', 'isSaving'],
    data: function () {
      return {
        Name: '',
        Type: 'Target',
        Source: '',
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
          Name: !!this.Name
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
