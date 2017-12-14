<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-2">
        <button class="button" @click.prevent="handleBackClick">Back to Candidate</button>
      </div>
      <div class="column">
        <h4 class="title is-4">Edit Resumes</h4>
      </div>
    </div>
    <resumes-editor :id="id" />
  </div>
</template>

<script>
  import { ResumesEditor } from '@/components/resumes';

  export default {
    name: 'EditResumes',
    components: { ResumesEditor },
    computed: {
      id: function () {
        return this.$route.params.id;
      }
    },
    methods: {
      handleBackClick() {
        this.$router.push(`/details/candidate/${this.id}`);
      }
    }
  };
</script>
