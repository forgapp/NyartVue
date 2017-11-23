<template>
  <section v-if="active">
    <slot />
  </section>
</template>

<script>
  export default {
    name: 'vPane',
    props: ['title'],
    data() {
      return { active: false };
    }
  };
</script>
