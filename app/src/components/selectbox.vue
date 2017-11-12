<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <div :class="selectClass">
        <select v-model="inputValue">
          <option v-if="placeholder" value="">{{ placeholder }}</option>
          <option v-for="(source, index) in sources" :key="index">
            {{ source.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'selectbox',
    props: [ 'label', 'placeholder', 'type', 'value' ],
    beforeMount: function () {
      if (!this.sources) {
        this.getPicklistValues(this.type);
      }
    },
    methods: mapActions('picklist', ['getPicklistValues']),
    computed: {
      ...mapGetters('picklist', ['getPicklistByType']),
      isLoading() {
        return !this.sources;
      },
      sources() {
        return this.getPicklistByType(this.type);
      },
      inputValue: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v);
        }
      },
      selectClass: function () {
        return {
          select: true,
          'is-fullwidth': true,
          'is-loading': this.isLoading
        };
      }
    }
  };
</script>
