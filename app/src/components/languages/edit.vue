<template>
  <div>
    <div v-for="language in value" class="field is-grouped">
      <p class="control is-expanded">
        <Selectbox
          placeholder="Language"
          type="Language"
          v-model="language.Language"
        />
      </p>
      <p class="control is-expanded">
        <Selectbox
          placeholder="Level"
          type="LanguageLevel"
          v-model="language.Level"
        />
      </p>
      <p class="control">
        <button @click="deleteLanguage" class="button is-danger">
          <i class="fa fa-trash"></i>
        </button>
      </p>
    </div>

    <div class="field">
      <div class="control">
        <button @click.prevent="addLanguage" class="button is-link">Add a language</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LanguageEdit',
    props: [ 'value' ],
    methods: {
      deleteLanguage() {},
      addLanguage() {
        const languages = this.value || [];
        const newLanguages = [ ...languages, {
          Language: '',
          Level: ''
        }];

        this.$emit('input', newLanguages);
      }
    }
  };
</script>
