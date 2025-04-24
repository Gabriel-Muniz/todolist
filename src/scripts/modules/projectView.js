import { renderTaskMain, renderTaskSidebar } from "./taskView";

export function renderSidebarProjects(projects) {
  const template = document.getElementById('project-template-sidebar')

  const sidebar = document.querySelector('.sidebar-section');

  projects.map(project => {

    const clone = template.content.cloneNode(true);

    const projectTitle = clone.querySelector('.project-title');

    const projectDuedate = clone.querySelector('.project-dueDate');

    projectTitle.textContent = project.title;
    projectDuedate.textContent = project.dueDate;

    const projectTasksContainer = clone.querySelector('.project-tasks');

    project.projectTasks.map(currentTask => {
      projectTasksContainer.append(renderTaskSidebar(currentTask))
    })

    sidebar.append(clone);

  })
}

export function renderProject(project){
  const mainSection = document.querySelector('.main-section');

  const template = document.getElementById('project-template-main');

  const clone = template.content.cloneNode(true);

  const projectTitle = clone.querySelector('.project-title');

  const projectDuedate = clone.querySelector('.project-dueDate');

  const projectDescription = clone.querySelector('.project-description');

  projectTitle.textContent = project.title;
  projectDuedate.textContent = project.dueDate;
  projectDescription.textContent = project.description;

  const projectTasksContainer = clone.querySelector('.project-tasks');

  project.projectTasks.map(currentTask => {
    projectTasksContainer.append(renderTaskMain(currentTask))
  })
  

  mainSection.append(clone);
  
}