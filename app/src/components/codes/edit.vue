<template>
  <div>
    <div v-for="(codes, category) in formattedCodes" :key="category" class="category">
      <h5 class="title is-6 category-title">{{ category }}</h5>
      <div class="field is-grouped is-grouped-multiline codes">
        <div v-for="(code, index) in codes" :key="index" class="control">
          <div class="tags has-addons">
            <span class="tag is-info">{{ code }}</span>
            <a class="tag is-delete" @click.prevent="remove(category, index)"></a>
          </div>
        </div>
      </div>
    </div>
    <add-code :type="type" @codeAdded="add" />
  </div>
</template>

<script>
  import AddCode from './addCode';
  
  export default {
    name: 'editCodes',
    props: [ 'type', 'codes' ],
    components: { AddCode },
    computed: {
      formattedCodes() {
        return this.serializeCodes(this.codes);
      }
    },
    methods: {
      serializeCodes(codes) {
        if (!codes) {
          return {};
        }

        return codes.reduce((aggr, current) => {
          const currentCodes = aggr[current.Category] || [];
          const codes = [ ...currentCodes, current.Code ];

          return Object.assign({}, aggr, { [current.Category]: codes });
        }, {});
      },
      deserialize(codes) {
        if (!codes) {
          return [];
        }

        return Object.keys(codes).map(key => {
          return codes[key].map(code => ({
            Category: key,
            Code: code
          }));
        }).reduce((aggr, current) => {
          console.log(aggr, current);
          return [
            ...aggr,
            ...current
          ];
        }, []);
      },
      add(code) {
        const codes = this.codes || [];
        const newCodes = [ ...codes, code ];

        this.$emit('codesChanged', newCodes);
      },
      remove(category, index) {
        const originalCodes = this.formattedCodes[category];
        const newCodes = [
          ...originalCodes.slice(0, index),
          ...originalCodes.slice(index + 1, originalCodes.length)
        ];
        const industries = Object.assign({}, this.formattedCodes, { [category]: newCodes });

        this.$emit('codesChanged', this.deserialize(industries));
        console.log(category, index, industries);
      }
    }
  };
</script>

<style scoped>
  .category {
    margin-bottom: .5rem;
  }
  
  .category-title {
    margin-bottom: 0.25rem;
  }
  
  .codes {
    margin-bottom: 0rem;
  }
</style>
