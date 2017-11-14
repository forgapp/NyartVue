<template>
  <div v-if="type === 'Candidate'">
    <candidate-card :id="hit._id" :record="hit._source" />
  </div>
  <div v-else-if="type === 'Company'">
    Company
  </div>
  <div v-else-if="type === 'Job'">
    Job
  </div>
  <div v-else-if="type === 'ClientContact'">
    ClientContact
  </div>
  <div v-else>
    No template.
  </div>
</template>

<script>
  import candidateCard from './candidate';

  export default {
    name: 'dynamicCard',
    components: { candidateCard },
    props: [ 'type', 'hit' ]
  };
</script>