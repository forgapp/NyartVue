<template>
  <div>
    <div class="field">
      <label class="label">Registration</label>
      <p class="control">
        <input class="input" type="date" placeholder="Stage Date" :value="step.StageDate" @change="updateStageDate" />
      </p>
    </div>
    <div className="field">
      <label className="label">Interview Date</label>
      <p className="control">
        <input className="input" type="date" placeholder="Date" :value="step.InterviewDate" @change="updateInterviewDate" />
      </p>
    </div>

    <div className="field">
      <label className="label">Interview Time</label>
      <p className="control">
        <input type="time" class="input" :value="step.InterviewTime" @change="updateInterviewTime" />
      </p>
    </div>
    <pre>{{step}}</pre>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({})
  class CcmForm extends Vue {
    @Prop({}) step

    // beforeMount() {
    //   console.log(this.step);
    //   if (!this.step.hasOwnProperty('StageDate')) {
    //     this.$emit('update', {
    //       Method: 'Email',
    //       StageDate: formatdateForInput(new Date())
    //     });
    //   }
    // }

    // stage = {
    //   Method: 'Email',
    //   StageDate: formatdateForInput(new Date())
    // }

    updateStageDate(event) {
      const { value } = event.target;

      this.$emit('update', Object.assign({}, this.step, { StageDate: value }));
    }

    updateInterviewDate(event) {
      const { value } = event.target;

      this.$emit('update', Object.assign({}, this.step, { InterviewDate: value }));
    }

    updateInterviewTime(event) {
      const { value } = event.target;

      this.$emit('update', Object.assign({}, this.step, { InterviewTime: value }));
    }

    // @Emit('input')
    // update(stage) { return stage; }
  }

  export default CcmForm;
</script>
