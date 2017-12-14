<template>
  <div class="editor">
    <div class="box menu">
      <div class="field is-grouped">
        <p class="control ">
          <a class="button is-success is-small" @click.prevent="save">
            Save
          </a>
        </p>
        <p class="control">
          <a class="button is-small" @click.prevent="cancel">
            Discard
          </a>
        </p>
      </div>
    </div>
    
    <div class="panels">
      <div class="edition-pane">
        <div ref="editor"></div>
      </div>
      <div class="preview-pane">
        <markdown :text="text" />
      </div>
    </div>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror';
  import 'codemirror/mode/gfm/gfm.js';
  import 'codemirror/lib/codemirror.css';
  import Markdown from './display';

  // console.log('GFS', Gfm);

  // import marked from 'marked';

  // const render = new marked.Renderer();

  // render.heading = (text, level) => `<h${level} class="title is-${level}">${text}</h${level}>`;
  // render.table = (header, body) => `<table class="table is-striped is-narrow">
  //   <thead>${header}</thead>
  //   <tbody>${body}</tbody>
  // </table>`;

  // marked.setOptions({
  //   renderer: render,
  //   gfm: true,
  //   tables: true,
  //   breaks: true,
  //   pedantic: false,
  //   sanitize: true,
  //   smartLists: true,
  //   smartypants: false
  // });

  export default {
    name: 'markdownEditor',
    components: { Markdown },
    props: [ 'text' ],
    data() {
      return {
        myCodeMirror: null,
        delay: null
      };
    },
    mounted() {
      this.myCodeMirror = CodeMirror(this.$refs.editor, {
        mode: 'gfm',
        lineNumbers: true,
        indentUnit: true,
        indentWithTabs: false,
        lineWrapping: true,
        sanitize: true,
        dragDrop: false,
        theme: 'default'
      });

      this.myCodeMirror.on('change', (editor) => {
        clearTimeout(this.delay);
        this.delay = setTimeout(() => {
          this.$emit('textUpdated', editor.getValue());
        }, 300);
      });
    },
    methods: {
      save() { this.$emit('save'); },
      cancel() { this.$emit('cancel'); }
    },
    watch: {
      text: function (val, oldVal) {
        if (!oldVal && val) {
          this.myCodeMirror.setValue(val);
        }

        this.text = val;
      }
    }
    // props: [ 'label', 'text' ],
    // computed: {
    //   compiledText: function () {
    //     const newText = this.text.replace(/\\n/g, '\n');

    //     return marked(newText);
    //   }
    // }
  };
</script>

<style scoped>
  .editor {
    display: flex;
    flex-direction: column;
  }
  
  .editor .menu {
    margin-bottom: 0.5rem;
    padding: 0.25rem;
  }
  
  /*.editor .buttons {*/
  /*  margin-bottom: 0.5rem;*/
  /*  padding: 0.25rem 1rem;*/
    
  /*  box-sizing: border-box;*/
  /*  position: relative;*/
  /*  height: 45px;*/
  /*  background: #009688;*/
  /*  box-shadow: 4px 3px 3px #aaa;*/
  /*  z-index: 20;*/
  /*}*/
  
  /*.editor .buttons .button {*/
  /*  margin-bottom: 0rem;*/
  /*  background: #009688;*/
  /*  color: #fff;*/
  /*}*/
  
  .panels {
    display: flex;
  }
  
  .edition-pane,
  .preview-pane {
    width: 50%;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
  
  .edition-pane {
    padding-right: 1rem;
  }
  
  .preview-pane {
    padding-left: 2rem;
  }
</style>