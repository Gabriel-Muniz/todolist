import { format } from "date-fns";
import { deserializeProjects, sortByPriority } from "../utils/storageManager";
import { renderTaskMain, renderTaskSidebar } from "./taskView";

export function renderSidebarProjects() {

  const projects = deserializeProjects();

  const sortedProjects = projects.toSorted(sortByPriority);

  const template = document.getElementById('project-template-sidebar')

  const sidebar = document.querySelector('.sidebar-section');

  sidebar.innerHTML = ''

  const btnAddProject = document.getElementById('add-project-template');
  const cloneAddBtn = btnAddProject.content.cloneNode(true);

  sidebar.append(cloneAddBtn);

  sortedProjects.map((project, index = null) => {
    index = projects.findIndex(element => element === project);

    const clone = template.content.cloneNode(true);

    const projectWrapper = clone.querySelector('.project-wrapper');

    projectWrapper.setAttribute('data-pj-index', index);
    const projectTitle = clone.querySelector('.project-title');

    const projectFullDate = project.dueDate;
    const projectDuedate = clone.querySelector('.project-dueDate');

    projectTitle.textContent = project.title;
    projectDuedate.textContent = format(projectFullDate, 'dd/MM/yyyy');

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

  const projectPriority = clone.querySelector('.project-priority');

  let auxPriority = projectPriority.querySelector(`option[value='${project.priority}']`);

  auxPriority.selected = true;


  // const projectDuedate = clone.querySelector('.project-dueDate');

  const projectFullDate = new Date(project.dueDate);

  const projectInDay = clone.querySelector('.inDay');
  const projectInMonth = clone.querySelector('.inMonth');
  const projectInYear = clone.querySelector('.inYear');

  projectInDay.value = format(projectFullDate, 'dd')
  projectInMonth.value = format(projectFullDate, 'MM')
  projectInYear.value = format(projectFullDate, 'yyyy')

  const projectDescription = clone.querySelector('.project-description');

  projectTitle.textContent = project.title;
  // projectDuedate.textContent = project.dueDate;
  projectDescription.textContent = project.description;

  const projectTasksContainer = clone.querySelector('.project-tasks');

  // console.debug(project)

  project.projectTasks.map((currentTask, index) => {
    projectTasksContainer.append(renderTaskMain(currentTask, index))
  })


  mainSection.append(clone);

}