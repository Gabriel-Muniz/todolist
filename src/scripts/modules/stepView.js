export function renderStep(step){
  const template = document.querySelector('#step-template-sidebar');

  const clone = template.content.cloneNode(true);

  const stepTitle = clone.querySelector('.step-title');

  const stepStatus = clone.querySelector('.step-status');

  stepStatus.checked = (step.status == true) ? true : false;
  

  stepTitle.textContent = step.title;

  return clone;
}