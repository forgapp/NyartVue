<template>
  <div v-if="type === 'Candidate'">
    <candidate-card :id="hit._id" :record="hit._source" />
  </div>
  <div v-else-if="type === 'Company'">
    <company-card :id="hit._id" :record="hit._source" />
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
  import CandidateCard from './candidate';
  import CompanyCard from './company';

  export default {
    name: 'dynamicCard',
    components: { CandidateCard, CompanyCard },
    props: [ 'type', 'hit' ]
  };
</script>