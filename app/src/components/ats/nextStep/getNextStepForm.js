import { formatdateForInput } from '@/lib/date';
import SubmittalForm from './submittal';
import CcmForm from './ccm';

function getNextStepForm(stage) {
  let form = null;

  if (stage.Offer) {
    return 'Placement';
  } else if (stage.CCM) {
    return 'Offer';
  } else if (stage.Submittal) {
    form = {
      label: 'CCM',
      form: CcmForm,
      step: {
        StageDate: formatdateForInput(new Date()),
        InterviewDate: formatdateForInput(new Date()),
        InterviewTime: ''
      }
    };
  } else if (stage.Application) {
    form = {
      label: 'Submittal',
      form: SubmittalForm,
      step: {
        Method: 'Email',
        StageDate: formatdateForInput(new Date())
      }
    };
  }

  return form;
}

function getCCMForm() {
  return {
    label: 'CCM',
    form: CcmForm,
    step: {
      StageDate: formatdateForInput(new Date()),
      InterviewDate: formatdateForInput(new Date()),
      InterviewTime: ''
    }
  };
}

export default {
  getNextStepForm,
  getCCMForm
};
