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
    <div class="field">
      <label class="label">Fee</label>
      <p class="control">
        <currency-input
          :value.number="step.Fee"
          @input="updateFee"
          placeholder="Fee"
        />
      </p>
      <p class="help">Type 'm' for million, 'k' for thousand.</p>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class PlacementForm extends Vue {
    @Prop({}) step

    updateStageDate(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { StageDate: value });

      this.update(stage);
    }

    updateFee(value) {
      const stage = Object.assign({}, this.step, { Fee: value });

      console.log(stage);

      this.update(stage);
    }

    @Emit()
    update(stage) {}
  }

  export default PlacementForm;
</script>