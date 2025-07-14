import { renderProject, renderSidebarProjects } from "./projectView";
import { deserializeProjects, getNewObject, getSidebarState, getStringifiedProjects, setActiveProject, setSidebarState, updateLocalStorage } from "../utils/storageManager";
import { format, isValid, longFormatters } from "date-fns";
import { getMaxDay } from "../utils/dateHelper";

const sidebar = document.querySelector('.sidebar-section');
const mainSection = document.querySelector('.main-section');

export function attachEventListeners() {

  mainSection.addEventListener('focusout', (e) => {
    if (!e.target.closest('.inYear')) return;

    const projects = deserializeProjects();
    const projectIndex = e.target.closest('.project-wrapper').dataset.pjIndex;
    const currentProject = projects[projectIndex];

    const inYear = document.querySelector('.inYear');

    if (inYear.value.length < 4) {
      inYear.value = new Date().getFullYear();
      const auxDate = new Date(currentProject.dueDate);
      auxDate.setFullYear(inYear.value);
      currentProject.dueDate = auxDate;
    }

    updateLocalStorage(projects);
    renderSidebarProjects();
  })

  mainSection.addEventListener('keydown', (e) => {

    if (!e.target.closest('[inputmode="numeric"]')) return;

    const projects = deserializeProjects();
    const projectIndex = e.target.closest('.project-wrapper').dataset.pjIndex;
    const currentProject = projects[projectIndex];
    let taskIndex = null;
    let currentTask = null;

    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
    ];

    if (!allowedKeys.includes(e.key) && !e.key.match(new RegExp(/[0-9]/))) {
      e.preventDefault();
      return;
    }

    const fullDateContainer = e.target.parentNode;

    if (fullDateContainer.classList.contains('task-dueDate')) {
      taskIndex = e.target.closest(`[data-tk-index]`).dataset.tkIndex;

      currentTask = currentProject.projectTasks[taskIndex];
    }

    const inDay = fullDateContainer.querySelector('.inDay');
    const inMonth = fullDateContainer.querySelector('.inMonth');
    const inYear = fullDateContainer.querySelector('.inYear');

    setTimeout(() => {
      if (inMonth.value > 12) {
        inMonth.value = 12;
      }
      if (inMonth.value === '00') {
        inMonth.value = '01';
      }

      const maxDay = getMaxDay(+inMonth.value, inYear.value);

      if (inDay.value <= 0 && inDay.value.length === 2) {
        inDay.value = '0' + 1;
      }

      if (inDay.value > maxDay) {
        inDay.value = maxDay;
      }

      const currentYear = new Date().getFullYear()

      if (inYear.value < currentYear - 100 && inYear.value.length === 4) {
        inYear.value = currentYear - 100;
      }

      const date = new Date(inYear.value, inMonth.value - 1, inDay.value);

      (currentTask) ? currentTask.dueDate = date : currentProject.dueDate = date;
      updateLocalStorage(projects);
      renderSidebarProjects();
    }, 10);

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

      console.log(inputField);

      if (inputField.dataset.input === 'description') {
        currentProject[`${inputField.dataset.input}`] = inputField.textContent;

        updateLocalStorage(projects)
        return;
      }

      if (inputField.dataset.input !== 'dueDate') {
        console.log('TESTANDO 1 2 3 ');

        currentProject[`${inputField.dataset.input}`] = inputField.textContent;

      }
      const newElemText = currentProject[`${inputField.dataset.input}`];

      //Get sidebar project element to update
      const sidebarElemUpdate = sidebar.children[Number(projectIndex) + 1] // +1 to account the add project button
        .querySelector(`.project-${inputField.dataset.input}`);

      updateElement(sidebarElemUpdate, newElemText);

    }

    if (inputField.dataset.type === 'inTask') {
      const taskIndex = e.target.closest('[data-tk-index]').dataset.tkIndex;

      const currentTask = currentProject.projectTasks[taskIndex];

      // currentTask[title] = inputField.textContent <- Example
      currentTask[inputField.dataset.input] = inputField.textContent;

      if (inputField.dataset.input === 'dueDate') return;

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


    if (e.target.closest('.add-task')) { currentProject.addTask(getNewObject('task')); objectAdded = true; }
    if (e.target.closest('.add-step')) { currentTask.addStep(getNewObject('step')); objectAdded = true; }

    if (objectAdded) {
      console.log(objectAdded);

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

    if (e.target.closest('input[type="checkbox"]')) {
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

      if (btnDelete.classList.contains('btn-project')) {
        projects.splice(projectIndex, 1);

        cleanMainSection();
        updateLocalStorage(projects);
        renderSidebarProjects();

        return
      }

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

  body.addEventListener('mouseup', (e) => {
    setTimeout(() => {
      updateSidebarState();
    }, 5);

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

  if (element.classList.contains('project-dueDate')) {
    element.textContent = format(newValue, 'dd/MM/yyyy');
    return;
  }

  if (element) {
    element.textContent = newValue;
  }
}

function updateSidebarState() {
  // console.clear();
  const sidebar = document.querySelector('.sidebar-section');
  let aux = Array.from(sidebar.querySelectorAll('[data-pj-index]'));

  let sidebarProjectState = [];

  aux.forEach((element, index) => {
    const projectSidebar = {
      visible: `${element.querySelector('.project-body.hidden') ? false : true}`,
      tasks: [],
    }

    const projectSidebarTasks = Array.from(element.querySelectorAll('.task-wrapper'));

    projectSidebarTasks.forEach((taskElement, index) => {
      projectSidebar.tasks.push((taskElement.querySelector('.task-body.hidden') ? false : true))
    })

    sidebarProjectState.push(projectSidebar)

  });
  setSidebarState(JSON.stringify(sidebarProjectState))
}

export function syncSidebarState() {
  const sidebarProjects = document.querySelectorAll('.project-wrapper.sidebar');
  const projectsSidebar = getSidebarState();

  projectsSidebar.forEach((project, projectIndex) => {

    const currentSidebarProject = sidebarProjects[projectIndex].querySelector('.project-body');

    const sidebarProjectTasks = currentSidebarProject.querySelectorAll('.task-body');

    projectsSidebar[projectIndex].tasks.forEach((task, taskIndex) => {
      
      if (task === false) {
        sidebarProjectTasks[taskIndex].classList.add('hidden')
      }
    })


    if (project.visible === 'false') {

      currentSidebarProject.classList.add('hidden');

    }

  })
}

//Update status real time