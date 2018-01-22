<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Edit Resumes</h4>
          </div>
          <div class="level-item">
            <button class="button" @click.prevent="handleBackClick">Back to Candidate</button>
          </div>
        </div>
      </div>
      <resumes-editor :id="id" />
    </div>
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

<style scoped>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }
</style>
