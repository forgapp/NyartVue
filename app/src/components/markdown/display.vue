<template>
  <div>
    <h3 v-if="!!label" class="title is-5">{{ label }}</h3>
    <div v-if="!!text" v-html="compiledText"></div>
  </div>
</template>

<script>
  import marked from 'marked';

  const render = new marked.Renderer();

  render.heading = (text, level) => `<h${level} class="title is-${level}">${text}</h${level}>`;
  render.table = (header, body) => `<table class="table is-striped is-narrow">
    <thead>${header}</thead>
    <tbody>${body}</tbody>
  </table>`;

  marked.setOptions({
    renderer: render,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  export default {
    name: 'markdown',
    props: [ 'label', 'text' ],
    computed: {
      compiledText: function () {
        const newText = this.text.replace(/\\n/g, '\n');

        return marked(newText);
      }
    }
  };
</script>