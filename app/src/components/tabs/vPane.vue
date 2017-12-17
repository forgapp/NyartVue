<template>
  <article v-if="active">
    <slot />
  </article>
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
