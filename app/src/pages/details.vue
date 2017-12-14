<template>
  <div class="container is-fluid">
    <candidate-details v-if="type === 'candidate'" :id="id" />
    <company-details v-if="type === 'company'" :id="id" />
    <client-contact-details v-if="type === 'clientContact'" :id="id" />
    <job-details v-if="type === 'job'" :id="id" />
  </div>
</template>

<script>
  import { CandidateDetails, CompanyDetails, ClientContactDetails, JobDetails } from '@/components/details';

  export default {
    name: 'details',
    components: { CandidateDetails, CompanyDetails, ClientContactDetails, JobDetails },
    computed: {
      type: function () {
        return this.$route.params.type;
      },
      id: function () {
        return this.$route.params.id;
      }
    }
  };
</script>