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
      <label class="label">Method</label>
      <div class="select is-fullwidth">
        <select :value="step.Method" @change="updateMethod">
          <option>Email</option>
          <option>Phone</option>
          <option>Face-to-Face</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class SubmittalForm extends Vue {
    @Prop({}) step

    updateStageDate(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { StageDate: value });

      this.update(stage);
    }

    updateMethod(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { Method: value });

      this.update(stage);
    }

    @Emit()
    update(stage) {}
  }

  export default SubmittalForm;
</script>
