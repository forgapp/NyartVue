<template>
  <div>
    <div class="field">
      <label class="label">Registration</label>
      <p class="control">
        <input class="input" type="date" placeholder="Stage Date" :value="step.StageDate" @change="updateStageDate" />
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
    <pre>{{step}}</pre>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({})
  class SubmittalForm extends Vue {
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

    updateMethod(event) {
      const { value } = event.target;

      this.$emit('update', Object.assign({}, this.step, { Method: value }));
    }

    // @Emit('input')
    // update(stage) { return stage; }
  }

  export default SubmittalForm;
</script>
