<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <div class="box">
        <h3 class="title is-4">New Process</h3>
        <process-form
          @save="save"
          @cancel="cancel"
          :recruiter="user"
          :isSaving="isSaving"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { firestore } from '@/lib/firebase';
  import { ProcessForm } from '@/components/new';

  export default {
    name: 'newProcess',
    components: { ProcessForm },
    data() {
      return {
        isSaving: false
      };
    },
    computed: {
      ...mapState('app', ['user']),
      query() {
        return this.$route.query;
      }
    },
    methods: {
      save(process) {
        this.isSaving = true;

        firestore.collection('Process')
          .add(process)
          .then(() => {
            console.log('Transaction successfully committed!');
            this.returnToRecord();
          }).catch(error => {
            console.log('Transaction failed: ', error);
          });
      },
      cancel() { this.returnToRecord(); },
      returnToRecord() {
        const { type, id } = this.query;

        this.$router.push(`/details/${type.toLowerCase()}/${id}`);
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
