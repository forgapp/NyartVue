<template>
  <lookup
    index="contacts"
    type="doc"
    placeholder="Candidate Name"
    v-model="inputValue"
    :formatLabel="item => `${item.Firstname} ${item.Lastname}`"
    :formatInputValue="item => item.Name"
    :formatItem="formatCandidateObject"
    extra-query="AND Type:candidate"
  />
</template>

<script>
  import lookup from './lookup';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'candidateLookup',
    components: { lookup },
    props: ['value'],
    computed: {
      inputValue: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v);
        }
      }
    },
    methods: {
      formatCandidateObject: item => ({
        id: item._id,
        Name: `${item._source.Firstname} ${item._source.Lastname}`,
        ref: item._id ? firestore.collection('Candidate').doc(item._id) : ''
      })
    }
  };
</script>