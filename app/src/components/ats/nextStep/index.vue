<template>
  <div>
    <a class="button is-primary" @click.prevent="toggleModal">
      <slot></slot>
    </a>
    <form :class="modalClass" @submit.prevent="handleSubmit">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ stepInformation.label }}</p>
          <button class="delete" aria-label="close" @click.prevent="toggleModal"></button>
        </header>
        <section class="modal-card-body">
          <component :is="stepInformation.form" :step="stepInformation.step" @update="handleUpdate"/>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" type="submit">Save</button>
          <button class="button" @click.prevent="toggleModal">Cancel</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import StepForm from './getNextStepForm';

  @Component({})
  class NextStep extends Vue {
    @Prop() process
    @Prop({ Type: 'Boolean' }) isNewCcm
    isOpen = false
    stepInformation = {}

    get modalClass() {
      return this.isOpen ? 'modal step-modal is-active' : 'modal';
    }

    getStepInformation(process) {
      if (this.isNewCcm) {
        return StepForm.getCCMForm();
      } else {
        return StepForm.getNextStepForm(process);
      }
    }

    toggleModal() {
      this.isOpen = !this.isOpen;
    }

    handleUpdate(updatedStep) {
      this.stepInformation = Object.assign(
        {},
        this.stepInformation,
        { step: updatedStep }
      );
    }

    handleSubmit() {
      let newStep = null;

      if (this.stepInformation.label === 'CCM') {
        const oldCCM = this.process.CCM ? this.process.CCM : [];
        const newCCM = [
          ...oldCCM,
          {
            ...this.stepInformation.step,
            Number: oldCCM.length + 1
          }
        ].filter(p => !!p);
        newStep = { CCM: newCCM };
      } else {
        newStep = {
          [this.stepInformation.label]: this.stepInformation.step
        };
      }

      firestore.collection('Process')
        .doc(this.process.id)
        .update(newStep)
        .then(() => this.toggleModal());
    }

    @Watch('process', { immediate: true })
    onProcessChanged(val, oldVal) {
      if (val) {
        this.stepInformation = this.getStepInformation(val);
      }
    }
  }

  export default NextStep;
</script>

<style scoped>
  .step-modal {
    z-index: 101;
  }
</style>
