import { renderProject, renderSidebarProjects } from "./projectView";
import { deserializeProjects, getNewObject, getStringifiedProjects, setActiveProject, updateLocalStorage } from "../utils/storageManager";
import { de } from "date-fns/locale";

const sidebar = document.querySelector('.sidebar-section');
const mainSection = document.querySelector('.main-section');

export function attachEventListeners() {

  sidebar.addEventListener('click', (e) => {
    if (e.target.closest('.project-header')) {

      const parent = e.target.closest('.project-header').parentNode; //Project-Wrapper
      const projectBody = parent.querySelector('.project-body');

      const projectIndex = parent.dataset.pjIndex;

      const currentProject = deserializeProjects()[projectIndex];

      projectBody.classList.toggle('hidden');

      cleanMainSection();
      renderProject(currentProject, projectIndex)
      setActiveProject(projectIndex);
    }

    if (e.target.closest('.task-header')) {
      const parent = e.target.closest('.task-header').parentNode; //Task-Wrapper
      const taskBody = parent.querySelector('.task-body');

      taskBody.classList.toggle('hidden');
    }

    if (e.target.closest('.add-project')) {
      const aux = getNewObject('project');

      const projects = deserializeProjects();

      projects.push(aux);

      updateLocalStorage(projects);
      renderSidebarProjects();
    }

    if (e.target.closest('.add-task')) {
      const aux = getNewObject('task');

      const projects = deserializeProjects();

      const projectIndex = e.target.closest('.project-wrapper').dataset.pjIndex;
      let currentProject = projects[projectIndex];

      currentProject.addTask(aux);
      console.log(currentProject)

      updateLocalStorage(projects);
      renderSidebarProjects();
    }

    if (e.target.closest('.add-step')) {
      const aux = getNewObject('step');

      const projects = deserializeProjects();

      const projectIndex = e.target.closest('.project-wrapper').dataset.pjIndex;
      const taskIndex = e.target.closest('.task-wrapper').dataset.tkIndex;

      let currentTask = projects[projectIndex]
        .projectTasks[taskIndex]
        .taskSteps;

      currentTask.push(aux);

      updateLocalStorage(projects);
      renderSidebarProjects();
    }

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
      const sidebarElemUpdate = sidebar.children[Number(projectIndex) + 1] // +1 to account the add project button
        .querySelector(`.project-${inputField.dataset.input}`);

      updateElement(sidebarElemUpdate, newElemText);

    }

    if (inputField.dataset.type == 'inTask') {
      const taskIndex = e.target.closest('[data-tk-index]').dataset.tkIndex;

      const currentTask = currentProject.projectTasks[taskIndex];

      // currentTask[title] = inputField.textContent <- Example
      currentTask[inputField.dataset.input] = inputField.textContent;

      const newElemText = currentTask[inputField.dataset.input];

      const sidebarTaskUpdate = sidebar.children[Number(projectIndex) + 1] // +1 to account the add project button
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

      const sidebarStepUpdate = sidebar.children[Number(projectIndex) + 1] // +1 to account the add project button
        .querySelector(`[data-tk-index='${parentTaskIndex}']`)
        .querySelector('.task-steps')
        .children[stepIndex]
        .querySelector('.step-title');

      updateElement(sidebarStepUpdate, newElemText)
      console.log(stepIndex);

    }

    setActiveProject(projectIndex);
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

    const taskProgress = sidebar.querySelector(`[data-pj-index="${projectIndex}"`)
      .querySelector(`[data-tk-index="${taskIndex}"`)
      .querySelector('.task-progress');

    const closestTask = projects[projectIndex].projectTasks[taskIndex];

    updateElement(taskProgress, closestTask.progress);

    updateLocalStorage(projects);

    if (!mainSection.querySelector(`[data-pj-index="${projectIndex}"`)) return;

    const stepMainSection = mainSection.querySelector(`[data-pj-index="${projectIndex}"`)
      .querySelector(`[data-tk-index="${taskIndex}"`)
      .querySelector(`[data-st-index="${stepIndex}"`)
      .querySelector('input');

    const stepSidebar = sidebar.querySelector(`[data-pj-index="${projectIndex}"`)
      .querySelector(`[data-tk-index="${taskIndex}"`)
      .querySelector(`[data-st-index="${stepIndex}"`)
      .querySelector('input');

    if (e.target.closest('.project-wrapper.main')) {
      updateElement(stepSidebar, currentStep.status);
      return;
    }

    updateElement(stepMainSection, currentStep.status);


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