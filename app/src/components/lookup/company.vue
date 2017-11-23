<template>
  <lookup
    index="record"
    type="Company"
    placeholder="Company Name"
    v-model="inputValue"
    :formatLabel="item => item.Name"
    :formatInputValue="item => item.Name"
    :formatItem="formatCompanyObject"
  />
</template>

<script>
  import lookup from './lookup';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'companyLookup',
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
      formatCompanyObject: item => ({
        id: item._id,
        Name: item._source.Name,
        ref: item._id ? firestore.collection('Company').doc(item._id) : ''
      })
    }
  };
</script>