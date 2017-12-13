<template>
  <candidate-card v-if="isType.candidate" :id="hit._id" :record="hit._source" />
  <company-card  v-else-if="isType.company" :id="hit._id" :record="hit._source" />
  <job-card v-else-if="isType.job" :id="hit._id" :record="hit._source" />
  <client-contact-card v-else-if="isType.clientContact" :id="hit._id" :record="hit._source" />
  <div v-else>No Card template.</div>
</template>

<script>
  import CandidateCard from './candidate';
  import ClientContactCard from './clientContact';
  import CompanyCard from './company';
  import JobCard from './job';

  export default {
    name: 'dynamicCard',
    components: { CandidateCard, CompanyCard, JobCard, ClientContactCard },
    props: [ 'index', 'hit' ],
    computed: {
      isType() {
        return {
          candidate: this.index === 'contacts' && this.hit._source.Type === 'candidate',
          clientContact: this.index === 'contacts' && this.hit._source.Type === 'client contact',
          company: this.index === 'companies',
          job: this.index === 'jobs'
        };
      }
    }
  };
</script>
