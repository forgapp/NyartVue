<template>
  <div>
    <div class="tabs">
      <ul className="tabs__labels">
        <li v-for="(label, index) in tabs" :class="isActive(index)" :key="index">
          <a @click.prevent="activatePane(index)">{{ label }}</a>
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'vTabs',
    data() {
      return {
        tabs: [],
        selected: 0
      };
    },
    mounted() {
      this.tabs = this.$children.map(child => child.title);
      this.activatePane(this.selected);
    },
    methods: {
      activatePane(index) {
        const currentTab = this.getTab(this.selected);
        const nextTab = this.getTab(index);

        this.selected = index;
        currentTab.active = false;
        nextTab.active = true;
      },
      getTab(index) {
        return this.$children[index];
      },
      isActive(index) {
        return this.selected === index ? 'is-active' : '';
      }
    }
  };
</script>

