<template>
  <div class="field is-grouped">
    <div class="control is-expanded">
      <div :class="categorySelectClass">
        <select :value="selectedCategory" :disabled="isLoading" v-model="selectedCategory">
          <option value="">Category</option>
          <option v-for="(category, index) in categories" :value="category" :key="index">{{ category }}</option>
        </select>
      </div>
    </div>
    
    <div class="control is-expanded">
      <div class='select is-fullwidth'>
        <select :value="selectedCode" :disabled="isLoading" v-model="selectedCode">
          <option value="">Codes</option>
          <option v-for="(code, index) in codes" :value="code" :key="index">{{ code }}</option>
        </select>
      </div>
    </div>
    
    <p class="control">
      <button class="button is-primary" @click.prevent="handleClick">
        <i class="fa fa-plus"></i>
      </button>
    </p>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'addCode',
    props: [ 'type' ],
    data() {
      return {
        selectedCategory: '',
        selectedCode: ''
      };
    },
    beforeMount: function () {
      if (!this.sources) {
        this.getCodeValues(this.type);
      }
    },
    methods: {
      ...mapActions('code', ['getCodeValues']),
      handleClick(event) {
        if (this.selectedCode === '') {
          return;
        }

        const code = {
          Category: this.selectedCategory,
          Code: this.selectedCode
        };

        this.$emit('codeAdded', code);
        this.selectedCode = '';
      }
    },
    computed: {
      ...mapGetters('code', ['getCodesByType']),
      categorySelectClass() {
        return this.isLoading ? 'select is-fullwidth is-loading' : 'select is-fullwidth';
      },
      isLoading() {
        return !this.sources;
      },
      sources() {
        return this.getCodesByType(this.type);
      },
      categories() {
        return !this.isLoading ? Object.keys(this.sources) : [];
      },
      codes() {
        return !this.isLoading ? this.sources[this.selectedCategory] : [];
      }
    },
    watch: {
      selectedCategory(val, oldVal) {
        this.selectedCode = '';
      }
    }
  };
</script>
