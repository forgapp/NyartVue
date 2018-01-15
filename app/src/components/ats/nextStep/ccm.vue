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
      <label class="label">Interview Date</label>
      <p class="control">
        <input
          class="input"
          type="date"
          placeholder="Date"
          :value="step.InterviewDate"
          @change="updateInterviewDate"
        />
      </p>
    </div>

    <div class="field">
      <label class="label">Interview Time</label>
      <p class="control">
        <input
          type="time"
          class="input"
          :value="step.InterviewTime"
          @change="updateInterviewTime"
        />
      </p>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class CcmForm extends Vue {
    @Prop({}) step

    updateStageDate(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { StageDate: value });

      this.update(stage);
    }

    updateInterviewDate(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { InterviewDate: value });

      this.update(stage);
    }

    updateInterviewTime(event) {
      const { value } = event.target;
      const stage = Object.assign({}, this.step, { InterviewTime: value });

      this.update(stage);
    }

    @Emit()
    update(stage) {}
  }

  export default CcmForm;
</script>
