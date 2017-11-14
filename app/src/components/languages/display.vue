<template>
  <div class="field is-grouped is-grouped-multiline" v-if="!!languages && languages.length > 0">
    <div class="control" v-for="(language, index) in languages" :key="index">
      <div class="tags has-addons">
        <span class="tag is-dark">{{ language.Language }}</span>
        <span class="tag is-info">{{ language.Level }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'displayLanguages',
    props: [ 'languages' ]
  };
</script>
