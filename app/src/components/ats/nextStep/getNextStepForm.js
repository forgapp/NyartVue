import { formatdateForInput } from '@/lib/date';
import SubmittalForm from './submittal';
import CcmForm from './ccm';
import OfferForm from './offer';
import PlacementForm from './placement';

function getNextStepForm(stage) {
  let form = null;

  if (stage.Offer) {
    form = {
      label: 'Placement',
      form: PlacementForm,
      step: {
        StageDate: formatdateForInput(new Date())
      }
    };
  } else if (stage.CCM) {
    form = {
      label: 'Offer',
      form: OfferForm,
      step: {
        StageDate: formatdateForInput(new Date())
      }
    };
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
