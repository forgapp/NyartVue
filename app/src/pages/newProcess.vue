<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <div class="box">
        <h3 class="title is-4">New Process</h3>
        <process-form
          @process-updated="handleUpdate"
          @save="save"
          @cancel="cancel"
          :process="process"
          :isSaving="isSaving"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { isEmpty } from '@/lib/utils';
  import { firestore } from '@/lib/firebase';
  import { ProcessForm } from '@/components/new';
  import { formatdateForInput } from '@/lib/date';

  @Component({
    components: { ProcessForm }
  })
  class NewProcess extends Vue {
    isSaving = false;
    process = {
      Status: 'In Progress',
      Application: {
        StageDate: formatdateForInput(new Date())
      },
      RegistrationDate: formatdateForInput(new Date())
    }

    beforeMount() {
      const { displayName, id } = this.$store.state.app.user;
      const recruiter = { id, Name: displayName };
      const candidate = {
        Name: this.query.candidateName || '',
        id: this.query.candidateId || '',
        ref: this.query.candidateId ? firestore.collection('Candidate').doc(this.query.candidateId) : ''
      };
      const job = {
        Title: this.query.jobName || '',
        id: this.query.jobId || '',
        ref: this.query.jobId ? firestore.collection('Job').doc(this.query.jobId) : ''
      };

      this.process = Object.assign({}, this.process, {
        Candidate: candidate,
        Job: job,
        Recruiter: recruiter
      });
    }

    get query() {
      return this.$route.query;
    }

    handleUpdate(process) {
      this.process = Object.assign({}, this.process, process);
    }

    save() {
      this.isSaving = true;

      const process = Object.keys(this.process)
        .filter(key => !isEmpty(this.process[key]))
        .reduce(
          (aggr, key) => Object.assign({}, aggr, { [key]: this.process[key] }),
          {}
        );

      firestore.collection('Process')
        .add(process)
        .then(() => {
          console.log('Transaction successfully committed!');
          this.returnToRecord();
        }).catch(error => {
          console.log('Transaction failed: ', error);
        });
    }

    cancel() { this.returnToRecord(); }

    returnToRecord() {
      const { candidateId, jobId } = this.query;
      const link = candidateId
        ? `/details/candidate/${candidateId}`
        : `/details/job/${jobId}`;

      this.$router.push(link);
    }
  }

  export default NewProcess;
  // export default {
  //   name: 'newProcess',
  //   components: { ProcessForm },
  //   data() {
  //     return {
  //       isSaving: false
  //     };
  //   },
  //   computed: {
  //     ...mapState('app', ['user']),
  //     query() {
  //       return this.$route.query;
  //     }
  //   },
  //   methods: {
  //     save(process) {
  //       this.isSaving = true;

  //       firestore.collection('Process')
  //         .add(process)
  //         .then(() => {
  //           console.log('Transaction successfully committed!');
  //           this.returnToRecord();
  //         }).catch(error => {
  //           console.log('Transaction failed: ', error);
  //         });
  //     },
  //     cancel() { this.returnToRecord(); },
  //     returnToRecord() {
  //       const { type, id } = this.query;

  //       this.$router.push(`/details/${type.toLowerCase()}/${id}`);
  //     }
  //   }
  // };
</script>

<style scoped>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }
</style>
