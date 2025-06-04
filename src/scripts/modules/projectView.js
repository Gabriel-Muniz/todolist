import { deserializeProjects } from "../utils/storageManager";
import { renderTaskMain, renderTaskSidebar } from "./taskView";

export function renderSidebarProjects() {

  const projects = deserializeProjects();

  const template = document.getElementById('project-template-sidebar')

  const sidebar = document.querySelector('.sidebar-section');

  sidebar.innerHTML = ''

  const btnAddProject = document.createElement('div');
  btnAddProject.classList.add('add-project');
  btnAddProject.textContent = '+';

  sidebar.append(btnAddProject);

  projects.map((project, index) => {

    const clone = template.content.cloneNode(true);

    const projectWrapper = clone.querySelector('.project-wrapper');

    projectWrapper.setAttribute('data-pj-index', index);
    const projectTitle = clone.querySelector('.project-title');

    const projectDuedate = clone.querySelector('.project-dueDate');

    projectTitle.textContent = project.title;
    projectDuedate.textContent = project.dueDate;

    const projectTasksContainer = clone.querySelector('.project-tasks');

    project.projectTasks.map((currentTask, index) => {
      projectTasksContainer.append(renderTaskSidebar(currentTask, index))
    })

    sidebar.append(clone);

  })
}

export function renderProject(project, index) {
  const mainSection = document.querySelector('.main-section');

  const template = document.getElementById('project-template-main');

  const clone = template.content.cloneNode(true);

  const projectWrapper = clone.querySelector('.project-wrapper');

  projectWrapper.setAttribute('data-pj-index', index);

  const projectTitle = clone.querySelector('.project-title');

  const projectDuedate = clone.querySelector('.project-dueDate');

  const projectDescription = clone.querySelector('.project-description');

  projectTitle.textContent = project.title;
  projectDuedate.textContent = project.dueDate;
  projectDescription.textContent = project.description;

  const projectTasksContainer = clone.querySelector('.project-tasks');

  console.debug(project)

  project.projectTasks.map((currentTask, index) => {
    projectTasksContainer.append(renderTaskMain(currentTask, index))
  })


  mainSection.append(clone);

}