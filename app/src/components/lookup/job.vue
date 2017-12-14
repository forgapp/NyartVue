<template>
  <lookup
    index="jobs"
    type="doc"
    placeholder="Job Title"
    v-model="inputValue"
    :formatLabel="item => item.JobTitle"
    :formatInputValue="item => item.Title"
    :formatItem="formatJobObject"
  />
</template>

<script>
  import lookup from './lookup';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'jobLookup',
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
      formatJobObject: item => ({
        id: item._id,
        Title: item._source.JobTitle,
        ref: item._id ? firestore.collection('Job').doc(item._id) : ''
      })
    }
  };
</script>