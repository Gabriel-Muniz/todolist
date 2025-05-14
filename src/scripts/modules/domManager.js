import { renderProject } from "./projectView";
import { deserializeProjects, updateLocalStorage } from "../utils/storageManager";
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

    if (inEdit) {
      const inputField = e.target.closest('[data-input]');

      if (inputField.dataset.type == 'inProject') {

        currentProject[`${inputField.dataset.input}`] = inputField.textContent;

        console.log();

        updateElement(sidebar.children[projectIndex].querySelector(`.project-${inputField.dataset.input}`), currentProject[`${inputField.dataset.input}`])
        // console.log(inputField.dataset.input);


        // sidebar.children[projectIndex] -> Vai pegar o projeto da sidebar que está sendo editado.

        updateLocalStorage(projects);
      }
    }


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

function updateElement(element, newText) {
  if(element){
    element.textContent = newText;
  }
}