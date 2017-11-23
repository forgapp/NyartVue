<template>
  <div class="container is-fluid">
    <candidate-details v-if="type === 'candidate'" :id="id" />
    <company-details v-if="type === 'company'" :id="id" />
  </div>
</template>

<script>
  import { CandidateDetails, CompanyDetails } from '@/components/details';

  export default {
    name: 'details',
    components: { CandidateDetails, CompanyDetails },
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