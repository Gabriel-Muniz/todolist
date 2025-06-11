import { renderProject, renderSidebarProjects } from "./projectView";
import { deserializeProjects, getNewObject, getStringifiedProjects, setActiveProject, updateLocalStorage } from "../utils/storageManager";
import { de } from "date-fns/locale";

const sidebar = document.querySelector('.sidebar-section');
const mainSection = document.querySelector('.main-section');

export function attachEventListeners() {

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
  });

  const body = document.querySelector('.body');

  body.addEventListener('click', (e) => {

    const projects = deserializeProjects();

    if (!e.target.closest('.project-wrapper') && !e.target.closest('.add-project')) return;

    let objectAdded = false;

    if (e.target.closest('.add-project')) {
      projects.push(getNewObject('project'));

      updateLocalStorage(projects);
      renderSidebarProjects();
      return;
    }


    const projectIndex = (e.target.closest('.project-wrapper')) ? e.target.closest('[data-pj-index]').dataset.pjIndex : null;
    let currentProject = (projectIndex) ? projects[projectIndex] : null;

    const taskIndex = (e.target.closest('.task-wrapper')) ? e.target.closest('[data-tk-index]').dataset.tkIndex : null;
    let currentTask = (taskIndex) ? currentProject.projectTasks[taskIndex] : null;

    const stepIndex = (e.target.closest('.step-wrapper')) ? e.target.closest('[data-st-index]').dataset.stIndex : null;
    let currentStep = (stepIndex) ? currentTask.taskSteps[stepIndex] : null;


    if (e.target.closest('.add-task')) currentProject.addTask(getNewObject('task')); objectAdded = true;
    if (e.target.closest('.add-step')) currentTask.addStep(getNewObject('step')); objectAdded = true;

    if (objectAdded) {
      cleanMainSection();
      renderProject(currentProject, projectIndex);
    }


    if (e.target.closest('.sidebar-section')) {

      if (e.target.closest('.project-header')) {
        const projectBody = e.target.closest('.project-wrapper').querySelector('.project-body');
        projectBody.classList.toggle('hidden');

        const projectIndex = e.target.closest('[data-pj-index]').dataset.pjIndex;

        cleanMainSection();
        renderProject(currentProject, projectIndex)
        setActiveProject(projectIndex);

        return;
      }

      if (e.target.closest('.task-header')) {
        const taskBody = e.target.closest('.task-wrapper').querySelector('.task-body');
        taskBody.classList.toggle('hidden');

        return
      }
    }

    if (e.target.closest('input')) {
      currentStep.changeStatus();

      const sidebarProject = sidebar.children[Number(projectIndex) + 1].dataset.pjIndex;
      const mainSectionProject = mainSection.querySelector('.project-wrapper').dataset.pjIndex;

      const stepMainSection = document.querySelector('.project-wrapper.main')
        .querySelector(`[data-tk-index="${taskIndex}"]`)
        .querySelector(`[data-st-index="${stepIndex}"]`);

      if (sidebarProject == mainSectionProject) {
        updateElement(stepMainSection.querySelector('input'), currentStep.status);
      }
    }

    if (e.target.closest('.delete')) {
      const btnDelete = e.target.closest('.delete');
      if (btnDelete.classList.contains('btn-task')) {
        currentProject.removeTask(taskIndex);
      }
      if (btnDelete.classList.contains('btn-step')) {
        currentTask.removeStep(stepIndex);
      }

      cleanMainSection();
      renderProject(currentProject, projectIndex);
    }
    updateLocalStorage(projects);
    renderSidebarProjects();

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