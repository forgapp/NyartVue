<template>
  <div class="container is-fluid">
    <company-edit v-if="isType('Company')" :id="id" @save="save" @cancel="redirectToRecord" />
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { CompanyEdit } from '@/components/editInformation';

  export default {
    name: 'EditInformation',
    components: { CompanyEdit },
    methods: {
      isType(type) {
        return this.type === type;
      },
      save(record) {
        console.log(record);
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
