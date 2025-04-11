import { renderTask } from "./taskView";

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
      projectTasksContainer.append(renderTask(currentTask))
    })

    sidebar.append(clone);

  })
}