<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <component
        :is="currentComponent"
        :id="id"
        @save="save"
        @cancel="redirectToRecord"
      />
    </div>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import { CompanyEdit, CandidateEdit, ClientContactEdit, JobEdit } from '@/components/editInformation';

  @Component({
    components: { CompanyEdit, CandidateEdit, ClientContactEdit, JobEdit }
  })
  class EditInformation extends Vue {
    save(record) {
      firestore.collection(this.type)
        .doc(this.id)
        .update(record)
        .then(() => {
          this.redirectToRecord();
        });
    }

    redirectToRecord() {
      const path = `/details/${this.type.toLowerCase()}/${this.id}`;

      this.$router.push({ path });
    }

    get currentComponent() {
      const components = {
        Company: CompanyEdit,
        Candidate: CandidateEdit,
        ClientContact: ClientContactEdit,
        Job: JobEdit
      };

      return components[this.type];
    }

    get type() {
      return this.$route.params.type;
    }

    get id() {
      return this.$route.params.id;
    }
  };

  export default EditInformation;
</script>

<style scoped>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }
</style>
