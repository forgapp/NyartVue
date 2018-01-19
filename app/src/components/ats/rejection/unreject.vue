<template>
  <div>
    <a class="button is-warning" @click.prevent="toggleModal">
      <i class="fa fa-refresh" aria-hidden="true"></i>
    </a>
    <div :class="modalClass">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p class="is-size-4">Are you sure you want to unreject {{ label }}?</p>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary" @click.prevent="unreject">Unreject</button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="toggleModal">Cancel</button>
            </p>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click.prevent="toggleModal"></button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import firebase, { firestore } from '@/lib/firebase';

  @Component({})
  class RejectButton extends Vue {
    @Prop({}) label
    @Prop({}) id
    isOpen = false

    get modalClass() {
      return this.isOpen ? 'modal step-modal is-active' : 'modal';
    }

    toggleModal() {
      this.isOpen = !this.isOpen;
    }

    unreject() {
      if (!this.id) {
        return;
      }

      const { FieldValue } = firebase.firestore;

      firestore.collection('Process')
        .doc(this.id)
        .update({
          Status: 'In Progress',
          RejectedDate: FieldValue.delete()
        })
        .then(this.toggleModal);
    }
  }

  export default RejectButton;
</script>

<style scoped>
  .step-modal {
    z-index: 101;
  }
</style>
