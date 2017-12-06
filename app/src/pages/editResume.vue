<template>
  <div class="container is-fluid">
    <resume-editor :id="id" />
  </div>
</template>

<script>
  import { ResumeEditor } from '@/components/resume';

  export default {
    name: 'EditResumes',
    components: { ResumeEditor },
    computed: {
      id: function () {
        return this.$route.params.id;
      }
    }
  };
</script>
