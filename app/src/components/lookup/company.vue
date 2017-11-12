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
        Name: item._source.Name
      })
    }
  };
</script>