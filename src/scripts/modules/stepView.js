export function renderStep(step, index, inMainSection = false) {
  const template = document.querySelector('#step-template');

  const clone = template.content.cloneNode(true);

  const stepWrapper = clone.querySelector('.step-wrapper');


  const stepTitle = clone.querySelector('.step-title');

  const stepStatus = clone.querySelector('.step-status');

  stepWrapper.setAttribute('data-st-index', index);
  if (inMainSection) {
    stepTitle.setAttribute('contenteditable', 'true');
    stepTitle.setAttribute('data-type', 'inStep');
    stepTitle.setAttribute('data-input', 'title');
    stepWrapper.classList.add('main');
  }

  stepStatus.checked = (step.status == true) ? true : false;


  stepTitle.textContent = step.title;

  return clone;
}