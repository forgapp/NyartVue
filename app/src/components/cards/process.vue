<template>
  <div class="card whiteboard-card">
   <header class="card-header">
     <p class="card-header-title header-title">
       <router-link :to="links.candidate" class="has-text-primary">{{ labels.candidate }}</router-link>
     </p>
     <a href="#" class="card-header-icon" aria-label="more options" @click.prevent="openAts(process.id)">
       <span class="icon">
         <i class="fa fa-file-text-o" aria-hidden="true"></i>
       </span>
     </a>
   </header>
   <div class="card-content">
     <div class="content">
       Applied To: <router-link :to="links.job">{{ labels.job }}</router-link>
       <span class="is-invisible">Company: <a>Name goes Here</a></span>
     </div>
     <div class="content is-invisible">
       2017-11-09 (2days ago)
     </div>
   </div>
 </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class ProcessCard extends Vue {
    @Prop({}) process

    get labels() {
      return {
        candidate: this.process.Candidate && this.process.Candidate.Name,
        job: this.process.Job && this.process.Job.Title
      };
    }

    get links() {
      return {
        candidate: this.process.Candidate ? `/details/candidate/${this.process.Candidate.id}` : '',
        job: this.process.Job ? `/details/job/${this.process.Job.id}` : ''
      };
    }

    @Emit('open-ats')
    openAts(id) {}
  }

  export default ProcessCard;
</script>

<style scoped>
  .whiteboard-card:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  .whiteboard-card .header-title,
  .whiteboard-card .header-title > a {
    overflow: hidden;
  }

  .whiteboard-card .header-title > a {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-header-icon {
    padding: 0rem .75rem;
  }

  .whiteboard-card .card-content {
    padding: 0.5rem 0.75rem;
  }

  .whiteboard-card .content:not(:last-child) {
    margin-bottom: 0.5rem;
  }
</style>
