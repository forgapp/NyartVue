<template>
  <div class="container is-fluid">
    <company-edit v-if="isType('Company')" :id="id" @save="save" @cancel="redirectToRecord" />
    <candidate-edit v-if="isType('Candidate')" :id="id" @save="save" @cancel="redirectToRecord" />
    <client-contact-edit v-if="isType('ClientContact')" :id="id" @save="save" @cancel="redirectToRecord" />
    <job-edit v-if="isType('Job')" :id="id" @save="save" @cancel="redirectToRecord" />
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { CompanyEdit, CandidateEdit, ClientContactEdit, JobEdit } from '@/components/editInformation';

  export default {
    name: 'EditInformation',
    components: { CompanyEdit, CandidateEdit, ClientContactEdit, JobEdit },
    methods: {
      isType(type) {
        return this.type === type;
      },
      save(record) {
        firestore.collection(this.type)
          .doc(this.id)
          .update(record)
          .then(() => {
            this.redirectToRecord();
          });
      },
      redirectToRecord() {
        this.$router.push({ path: `/details/${this.type.toLowerCase()}/${this.id}` });
      }
    },
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
