<template>
  <div class="menu">
    <div v-for="(codes, category) in formattedCode" :key="category" class="columns no-bottom-margin">
      <div class="column is-one-quarter"> 
        <h6 class="title is-6 is-marginless has-text-right">{{ category }}</h6>
      </div>
      <div class="column">
        <div class="tags">
          <div v-for="(code, index) in codes" class="tag" :key="index">{{ code }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DisplayCodes',
    props: ['codes'],
    computed: {
      formattedCode: function () {
        let codes = [];

        if (this.codes) {
          codes = this.codes.reduce((aggr, curr) => {
            if (!aggr[curr.Category]) {
              return {
                ...aggr,
                [ curr.Category ]: [ curr.Code ]
              };
            }

            const newCodes = Object.assign({}, aggr, {
              [curr.Category]: [ ...aggr[curr.Category], curr.Code ]
            });

            return newCodes;
          }, {});
        }

        return codes;
      }
    }
  };
</script>

<style scoped>
  .no-bottom-margin {
    margin-bottom: 0rem;
  }
</style>
