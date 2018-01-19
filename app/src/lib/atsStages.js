export function getCurrentStage(stage) {
  let currentStage = null;

  if (stage.Placement) {
    currentStage = 'placement';
  } else if (stage.Offer) {
    currentStage = 'offer';
  } else if (stage.CCM && stage.CCM.length > 1) {
    currentStage = 'ccm';
  } else if (stage.CCM && stage.CCM.length === 1) {
    currentStage = 'ccm1';
  } else if (stage.Submittal) {
    currentStage = 'submittal';
  } else if (stage.Application) {
    currentStage = 'application';
  }

  return currentStage;
}

export function getPreviousStage(stage) {
  let currentStage = null;

  if (stage.Placement) {
    currentStage = 'offer';
  } else if (stage.Offer) {
    currentStage = 'ccm';
  } else if (stage.CCM && stage.CCM.length > 1) {
    currentStage = 'ccm1';
  } else if (stage.CCM && stage.CCM.length === 1) {
    currentStage = 'submittal';
  } else if (stage.Submittal) {
    currentStage = 'application';
  }

  return currentStage;
}
