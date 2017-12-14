<template>
  <lookup
    index="config"
    type="user"
    placeholder="Recruiter"
    v-model="inputValue"
    :formatLabel="formatRecruiterLabel"
    :formatInputValue="(recruiter) => recruiter.Name"
    :formatItem="formatRecruiterObject"
    :is-small="isSmall"
  />
</template>

<script>
  import lookup from './lookup';

  export default {
    name: 'companyLookup',
    components: { lookup },
    props: ['value', 'isSmall'],
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
      formatRecruiterLabel: item => `${item.Firstname} ${item.Lastname}`,
      formatRecruiterObject: item => ({
        id: item._id,
        Name: `${item._source.Firstname} ${item._source.Lastname}`
      })
    }
  };
</script>