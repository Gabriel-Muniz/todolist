import { renderProject } from "./projectView";
import { deserializeProjects, getStringifiedProjects, updateLocalStorage } from "../utils/storageManager";
import { de } from "date-fns/locale";

const sidebar = document.querySelector('.sidebar-section');
const mainSection = document.querySelector('.main-section');

export function attachEventListeners() {

  const projectHeaders = document.querySelectorAll('.project-header');

  projectHeaders.forEach(project => {
    project.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode; //Project-Wrapper
      const projectBody = parent.querySelector('.project-body');

      const projectIndex = parent.dataset.pjIndex;

      const currentProject = deserializeProjects()[projectIndex];

      projectBody.classList.toggle('hidden');


      cleanMainSection();
      renderProject(currentProject, projectIndex)
    })
  })

  mainSection.addEventListener('keyup', (e) => {
    const inEdit = e.currentTarget;
    const projectWrapper = inEdit.querySelector('.project-wrapper');
    const projectIndex = projectWrapper.dataset.pjIndex;

    const projects = deserializeProjects();
    const currentProject = projects[projectIndex];

    if (!inEdit) return;

    const inputField = e.target.closest('[data-input]');

    if (inputField.dataset.type == 'inProject') {

      currentProject[`${inputField.dataset.input}`] = inputField.textContent;

      const newElemText = currentProject[`${inputField.dataset.input}`];

      //Get sidebar project element to update
      const sidebarElemUpdate = sidebar.children[projectIndex].querySelector(`.project-${inputField.dataset.input}`);

      updateElement(sidebarElemUpdate, newElemText);

    }

    if (inputField.dataset.type == 'inTask') {
      const taskIndex = e.target.closest('[data-tk-index]').dataset.tkIndex;

      const currentTask = currentProject.projectTasks[taskIndex];

      // currentTask[title] = inputField.textContent <- Example
      currentTask[inputField.dataset.input] = inputField.textContent;

      const newElemText = currentTask[inputField.dataset.input];

      const sidebarTaskUpdate = sidebar.children[projectIndex]
        .querySelector(`[data-tk-index='${taskIndex}']`)
        .querySelector('.task-title');

      console.log(sidebarTaskUpdate);

      updateElement(sidebarTaskUpdate, newElemText);

    }

    if (inputField.dataset.type == 'inStep') {

      const stepTitle = e.target.closest('.step-title').textContent;

      const stepIndex = e.target.closest('.step-wrapper').dataset.stIndex;

      const parentTaskIndex = e.target.closest('[data-tk-index]').dataset.tkIndex;

      const currentStep = currentProject.projectTasks[parentTaskIndex].taskSteps[stepIndex];

      currentStep.title = stepTitle;

      const newElemText = currentStep.title;

      const sidebarStepUpdate = sidebar.children[projectIndex]
        .querySelector(`[data-tk-index='${parentTaskIndex}']`)
        .querySelector('.task-steps')
        .children[stepIndex]
        .querySelector('.step-title');

      updateElement(sidebarStepUpdate, newElemText)
      console.log(stepIndex);

    }

    updateLocalStorage(projects);
  })

  // const stepWrappers = document.querySelectorAll('.step-wrapper');

  // stepWrappers.forEach(stepWrapper => {

  //   stepWrapper.addEventListener('click', (e) => {

  //     if (!e.target.matches('input')) return;

  //     const projects = deserializeProjects();
  //     const projectIndex = e.target.closest('[data-pj-index]').dataset.pjIndex;
  //     const taskIndex = e.target.closest('[data-tk-index]').dataset.tkIndex;
  //     const stepIndex = e.target.closest('[data-st-index]').dataset.stIndex;

  //     const currentStep = projects[projectIndex].projectTasks[taskIndex].taskSteps[stepIndex]

  //     currentStep.changeStatus();

  //     updateLocalStorage(projects);

  //     if (!mainSection.querySelector(`[data-pj-index="${projectIndex}"`)) return;

  //     const stepMainSection = mainSection.querySelector(`[data-pj-index="${projectIndex}"`)
  //       .querySelector(`[data-tk-index="${taskIndex}"`)
  //       .querySelector(`[data-st-index="${stepIndex}"`)
  //       .querySelector('input')

  //     updateElement(stepMainSection, currentStep.status);


  //   })
  // })

  const body = document.querySelector('body');

  body.addEventListener('click', (e) => {

    if (!e.target.matches('input')) return;

    const projects = deserializeProjects();
    const projectIndex = e.target.closest('[data-pj-index]').dataset.pjIndex;
    const taskIndex = e.target.closest('[data-tk-index]').dataset.tkIndex;
    const stepIndex = e.target.closest('[data-st-index]').dataset.stIndex;

    const currentStep = projects[projectIndex].projectTasks[taskIndex].taskSteps[stepIndex]

    currentStep.changeStatus();

    updateLocalStorage(projects);

    if (!mainSection.querySelector(`[data-pj-index="${projectIndex}"`)) return;

    const stepMainSection = mainSection.querySelector(`[data-pj-index="${projectIndex}"`)
      .querySelector(`[data-tk-index="${taskIndex}"`)
      .querySelector(`[data-st-index="${stepIndex}"`)
      .querySelector('input')

    updateElement(stepMainSection, currentStep.status);


  })

  const taskHeaders = document.querySelectorAll('.task-header')

  taskHeaders.forEach(task => {
    task.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode; //Task-Wrapper
      const taskBody = parent.querySelector('.task-body');

      taskBody.classList.toggle('hidden');

    })
  })
}

export function cleanMainSection() {
  mainSection.innerHTML = '';
}

function updateElement(element, newValue) {
  if (element.matches('input')) {

    element.checked = (newValue == true) ? true : false;
    return;
  }

  if (element) {
    element.textContent = newValue;
  }
}

//Update status real time