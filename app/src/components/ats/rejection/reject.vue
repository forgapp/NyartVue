<template>
  <div>
    <a class="button is-danger" @click.prevent="toggleModal">
      <i class="fa fa-ban" aria-hidden="true"></i>
    </a>
    <div :class="modalClass">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p class="is-size-4">Are you sure you want to reject {{ label }}?</p>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary" @click="reject">Reject</button>
            </p>
            <p class="control">
              <button class="button" @click="toggleModal">Cancel</button>
            </p>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import { formatdateForInput } from '@/lib/date';

  @Component({})
  class RejectButton extends Vue {
    @Prop({}) id
    @Prop({}) label
    isOpen = false;

    get modalClass() {
      return this.isOpen ? 'modal step-modal is-active' : 'modal';
    }

    toggleModal() {
      this.isOpen = !this.isOpen;
    }

    reject() {
      if (!this.id) {
        return;
      }

      firestore.collection('Process')
        .doc(this.id)
        .update({
          Status: 'Rejected',
          RejectedDate: formatdateForInput(new Date())
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
