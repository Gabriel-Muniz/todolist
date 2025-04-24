import { renderStep } from "./stepView";

export function renderTaskSidebar(task) {
  const template = document.getElementById('task-template-sidebar');

  const clone = template.content.cloneNode(true);

  const taskTitle = clone.querySelector('.task-title');

  const taskProgress = clone.querySelector('.task-progress');

  taskTitle.textContent = task.title;
  taskProgress.textContent = task.progress

  const taskStepsContainer = clone.querySelector('.task-steps');

  task.taskSteps.map(currentStep => {
    taskStepsContainer.append(renderStep(currentStep));
  })

  return clone;
}

export function renderTaskMain(task){
  const template = document.getElementById('task-template-main');

  const clone = template.content.cloneNode(true);

  const taskTitle = clone.querySelector('.task-title');

  const taskDuedate = clone.querySelector('.task-dueDate');

  taskTitle.textContent = task.title;
  taskDuedate.textContent = task.dueDate;

  const taskSteps = clone.querySelector('.task-steps');

  task.taskSteps.map(currentStep => {
    taskSteps.append(renderStep(currentStep));
  })

  return clone;
}
