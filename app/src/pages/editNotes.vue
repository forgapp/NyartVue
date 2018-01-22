<template>
  <div class="container is-scrollable">
    <div class="section">
      <markdown-editor
        :text="text"
        @save="handleSave"
        @cancel="handleCancel"
        @textUpdated="handleTextUpdate" />
    </div>
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { MarkdownEditor } from '@/components/markdown';

  export default {
    name: 'editNotes',
    components: { MarkdownEditor },
    beforeMount() {
      firestore.collection(this.params.type)
        .doc(this.params.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.text = doc.data()[this.params.fieldname] || '';
          }
        });
    },
    data() { return { text: '' }; },
    computed: {
      params() {
        return {
          id: this.$route.params.id,
          fieldname: this.$route.params.fieldname,
          type: this.$route.params.type
        };
      }
    },
    methods: {
      handleTextUpdate(text) { this.text = text; },
      handleSave() {
        firestore.collection(this.params.type)
          .doc(this.params.id)
          .update({ [this.params.fieldname]: this.text })
          .then(doc => {
            this.handleCancel();
          });
      },
      handleCancel() {
        this.$router.push({
          path: `/details/${this.params.type.toLowerCase()}/${this.params.id}`
        });
      }
    }
  };
</script>

<style scoped>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }
</style>
