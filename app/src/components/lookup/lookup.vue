<template>
  <div class="field">
    <div class="{ 'label': true, 'is-small': isSmall }" v-if="label">{{ label }}</div>
    <div :class="dropdownClass">
      <div class="dropdown-trigger">
        <p class="control has-icons-right">
          <input :class="{ 'input': true, 'is-small': isSmall }" v-model="searchText" @keyup="keyup" @keydown.enter="keydown" :placeholder="placeholder" />
          <span :class="{ 'icon': true, 'is-small': true, 'is-right': true, clear: true, 'is-hidden': isEmpty }" @click="clearSelection">
            <i class="fa fa-times"></i>
          </span>
        </p>
      </div>
      <div class="dropdown-menu is-fullwitdth" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <span class="dropdown-item" v-if="noResults">No Results.</span>
          <a
            @mouseenter="handleOver(index)"
            :class="{ 'dropdown-item': true, 'is-active': isHiglighted(index)  }"
            v-if="hasResults"
            v-for="(suggestion, index) in suggestions"
            @click.prevent="handleSelect(suggestion)"
            :key="suggestion._id"
          >
            {{ formatLabel(suggestion._source) }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { isEmpty } from '@/lib/utils';
  import Elastic from '@/lib/elastic';
  import debounce from 'debounce';

  const KEY_UP = 38;
  const KEY_DOWN = 40;
  const ENTER = 13;

  export default {
    name: 'lookup',
    props: ['label', 'formatLabel', 'value', 'index', 'type', 'extraQuery', 'placeholder', 'formatInputValue', 'formatItem', 'isSmall'],
    beforeMount() {
      this.elastic = new Elastic();
      this.elastic
        .setIndex(this.index)
        .setType(this.type)
        .size(15);
    },
    mounted: function () {
      document.documentElement.addEventListener('click', this.clickAway, false);
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('click', this.clickAway, false);
    },
    data: () => ({
      searchText: '',
      suggestions: null,
      highlightedIndex: -1
    }),
    computed: {
      dropdownClass: function () {
        return {
          dropdown: true,
          autocomplete: true,
          'is-active': !!this.suggestions
        };
      },
      noResults: function () {
        return this.suggestions && this.suggestions.length === 0;
      },
      hasResults: function () {
        return this.suggestions && this.suggestions.length > 0;
      },
      isEmpty: function () {
        return isEmpty(this.value);
      }
    },
    methods: {
      keydown: function (event) {
        if (this.hasResults) {
          event.preventDefault();
        }
      },
      keyup: function (event) {
        switch (event.keyCode) {
        case KEY_UP:
          event.preventDefault();
          this.decrementHighlightedIndex();
          break;
        case KEY_DOWN:
          event.preventDefault();
          this.incrementHighlightedIndex();
          break;
        case ENTER:
          event.preventDefault();
          this.selectItem();
          break;
        default:
          this.search(event.target.value);
        }
      },
      handleSelect: function (selected) {
        this.suggestions = null;
        this.highlightedIndex = -1;
        this.$emit('input', this.formatItem(selected));
      },
      clearSelection: function () {
        this.$emit('input', {});
      },
      search: debounce(function (value) {
        const searchText = `${value}*`;
        const query = this.extraQuery ? searchText + ' ' + this.extraQuery : searchText;

        this.elastic.query(query)
          .search()
          .then(response => {
            this.suggestions = response.hits.hits;
          });
      }, 250),
      incrementHighlightedIndex: function () {
        if (this.highlightedIndex < this.suggestions.length - 1) {
          this.highlightedIndex += 1;
        }
      },
      decrementHighlightedIndex: function () {
        if (this.highlightedIndex >= 0) {
          this.highlightedIndex -= 1;
        }
      },
      isHiglighted: function (index) {
        return index === this.highlightedIndex;
      },
      selectItem: function () {
        if (this.highlightedIndex >= 0) {
          const item = this.suggestions[this.highlightedIndex];

          this.$emit('input', this.formatItem(item));
        } else {
          this.$emit('input', {});
        }

        this.suggestions = null;
        this.highlightedIndex = -1;
      },
      handleOver: function (index) {
        this.highlightedIndex = index;
      },
      clickAway: function (event) {
        if (this.suggestions && !this.$el.contains(event.target)) {
          this.suggestions = null;
          this.highlightedIndex = -1;
          this.searchText = this.formatInputValue(this.value);
        }
      }
    },
    watch: {
      value: {
        handler: function (value, oldValue) {
          this.searchText = this.formatInputValue(value);
        },
        immediate: true
      }
    }
  };
</script>

<style scoped>
  .autocomplete {
    display: inherit;
  }

  .is-fullwitdth {
    width: 100%;
  }

  .dropdown .clear {
    pointer-events: all;
    cursor: pointer;
  }

  .dropdown:hover .clear {
    color: red;
  }
</style>
