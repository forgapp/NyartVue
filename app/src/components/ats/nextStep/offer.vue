<template>
  <div>
    <div class="field">
      <label class="label">Stage Date</label>
      <p class="control">
        <input
          class="input"
          type="date"
          placeholder="Stage Date"
          :value="step.StageDate"
          @change="updateStageDate"
        />
      </p>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class OfferForm extends Vue {
    @Prop({}) step

    updateStageDate(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { StageDate: value });

      this.update(stage);
    }

    @Emit()
    update(stage) {}
  }

  export default OfferForm;
</script>