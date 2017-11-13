<template>
  <input
    class="input"
    type="number"
    :value="value"
    @keyup="handleInput"
    :placeholder="placeholder"
  />
</template>

<script>
  export default {
    name: 'currencyInput',
    props: [ 'value', 'placeholder' ],
    methods: {
      handleInput(event) {
        const { value } = event.target;
        const valueNumber = Number(value);

        switch (event.key) {
        case 'm':
          this.$emit('input', valueNumber * 1e6);
          break;
        case 'k':
          this.$emit('input', valueNumber * 1e4);
          break;
        default:
          this.$emit('input', valueNumber);
        }
      }
    },
    computed: {
      inputValue: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v);
        }
      }
    }
  };
</script>
