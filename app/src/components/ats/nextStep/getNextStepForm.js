import { formatdateForInput } from '@/lib/date';
import SubmittalForm from './submittal';

export default function getNextStepForm(stage) {
  let form = null;

  if (stage.Offer) {
    return 'Placement';
  } else if (stage.CCM) {
    return 'Offer';
  } else if (stage.Submittal) {
    return 'CCM';
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
};
