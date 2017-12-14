<template>
  <div class="field">
    <a v-for="resume in resumes" class="button is-text is-small" href="resume.Url" target="_blank">
      <span class="icon is-small">
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
      </span>
      <span>{{ resume.Name }}</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'resumeDisplay',
    props: [ 'resumes' ]
  };
</script>
