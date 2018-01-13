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
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import StepForm from './getNextStepForm';

  @Component({})
  class NextStep extends Vue {
    @Prop() process
    @Prop({ Type: 'Boolean' }) isNewCcm
    isOpen = false
    // stepInformation = {}

    // mounted() {
    //   console.log('MOUNTED', this.process);
    //   this.init();
    // }

    // beforeUpdate() {
    //   console.log('BEFORE Update', this.process);
    // }

    get stepInformation() {
      if (this.isNewCcm) {
        return StepForm.getCCMForm();
      } else {
        return StepForm.getNextStepForm(this.process);
      }
    }

    // @Watch('process', { immediate: true })
    // onProcessChanged(value) {
    //   console.log('Wather', value);
    //   if (this.isNewCcm) {
    //     this.stepInformation = StepForm.getCCMForm();
    //   } else {
    //     this.stepInformation = StepForm.getNextStepForm(value);
    //   }
    // }

    get modalClass() {
      return this.isOpen ? 'modal step-modal is-active' : 'modal';
    }

    toggleModal() {
      this.isOpen = !this.isOpen;
    }

    handleChange(res) {
      console.log(res);
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

      console.log('handleSubmit');
      firestore.collection('Process')
        .doc(this.process.id)
        .update(newStep)
        .then(() => this.toggleModal());
    }

    // @Watch('process')
    // onProcessChanged(val, oldVal) { console.log('WATCHER', val, oldVal); }
  }

  export default NextStep;

//   import { h, Component } from 'preact';
// import { database } from '../../../lib/firebase';
// import { formatdateForInput } from '../../../lib/date';
// import Submittal from './submittal';
// import CCM from './ccm';
// import Offer from './offer';
// import Placement from './placement';

// class NextButton extends Component {
//   state = {
//     isOpen: false,
//     stage: null
//   }

//   constructor(props) {
//     super(props);

//     this.toggleModal = this.toggleModal.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentWillMount() {
//     if (this.props.nextStage === 'CCM') {
//       this.setState({ stage: {
//         StageDate: formatdateForInput(new Date()),
//         InterviewDate: formatdateForInput(new Date()),
//         InterviewTime: ''
//       }});
//     } else {
//       this.setState({ stage: {
//         StageDate: formatdateForInput(new Date())
//       }});
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.nextStage === 'CCM') {
//       this.setState({ stage: {
//         StageDate: formatdateForInput(new Date()),
//         InterviewDate: formatdateForInput(new Date()),
//         InterviewTime: ''
//       }});
//     } else {
//       this.setState({ stage: {
//         StageDate: formatdateForInput(new Date())
//       }});
//     }
//   }

//   toggleModal(event) {
//     event.preventDefault();

//     this.setState({ isOpen: !this.state.isOpen });
//   }

//   handleChange(event) {
//     const { id, value } = event.target;
//     const stage = Object.assign({}, this.state.stage, {
//       [id]: value
//     });

//     this.setState({ stage });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const stageRef = database.ref('Process')
//       .child(this.props.id)
//       .child(this.props.nextStage);

//     if(this.props.nextStage === 'CCM') {
//       stageRef.push()
//         .set({
//           ...this.state.stage,
//           'Number': this.props.ccmNumber || 1
//         })
//         .then(() => this.setState({ isOpen: false }));
//     } else {
//       stageRef
//         .set(this.state.stage)
//         .then(() => this.setState({ isOpen: false }));
//     }
//   }

//   getStageForm() {
//     switch(this.props.nextStage) {
//       case 'Placement':
//         return Placement;
//       case 'Offer':
//         return Offer;
//       case 'CCM':
//         return CCM;
//       case 'Submittal':
//         return Submittal;
//       default:
//         return null;
//     }
//   }

//   render({ children }, { isOpen, stage }) {
//     const modalClass = isOpen ? 'modal is-active' : 'modal';
//     const StageForm = this.getStageForm();

//     return (<div>
//       <a class="button is-primary" onClick={ this.toggleModal }>
//         { children }
//       </a>
//       <form class={ modalClass } onSubmit={ this.handleSubmit }>
//         <div class="modal-background"></div>
//         <div class="modal-card">
//           <header class="modal-card-head">
//             <p class="modal-card-title">{ this.props.nextStage }</p>
//             <button class="delete" aria-label="close" onClick={ this.toggleModal }></button>
//           </header>
//           <section class="modal-card-body">
//             <StageForm stage={ stage } handleChange={ this.handleChange } />
//           </section>
//           <footer class="modal-card-foot">
//             <button class="button is-primary" type="submit">Save</button>
//             <button class="button" onClick={ this.toggleModal }>Cancel</button>
//           </footer>
//         </div>
//       </form>
//     </div>);
//   }
// }

// export default NextButton;
</script>

<style scoped>
  .step-modal {
    z-index: 101;
  }
</style>
