import { format } from "date-fns";
import { renderStep } from "./stepView";

function renderNewTaskButton() {
  const btnAddTask = document.createElement('div');
  btnAddTask.classList.add('add-task');
  btnAddTask.textContent = '+';

  return btnAddTask;
}

export function renderTaskSidebar(task, index) {
  const template = document.getElementById('task-template-sidebar');

  const clone = template.content.cloneNode(true);

  const taskTitle = clone.querySelector('.task-title');

  const taskWrapper = clone.querySelector('.task-wrapper').setAttribute('data-tk-index', index)

  const taskProgress = clone.querySelector('.task-progress');

  taskTitle.textContent = task.title;
  taskProgress.textContent = task.progress

  const taskSteps = clone.querySelector('.task-steps');

  task.taskSteps.map((currentStep, stepIndex) => {
    taskSteps.append(renderStep(currentStep, stepIndex));
  })

  return clone;
}

export function renderTaskMain(task, index) {
  const template = document.getElementById('task-template-main');

  const clone = template.content.cloneNode(true);

  const taskWrapper = clone.querySelector('.task-wrapper');

  const taskTitle = clone.querySelector('.task-title');
  const taskFullDate = new Date(task.dueDate);

  const taskInDay = clone.querySelector('.inDay');
  const taskInMonth = clone.querySelector('.inMonth');
  const taskInYear = clone.querySelector('.inYear');

  taskInDay.value = format(taskFullDate, 'dd')
  taskInMonth.value = format(taskFullDate, 'MM')
  taskInYear.value = format(taskFullDate, 'yyyy')

  taskTitle.textContent = task.title;
  // taskDuedate.textContent = task.dueDate;
  taskWrapper.setAttribute('data-tk-index', index);

  const taskSteps = clone.querySelector('.task-steps');

  // console.log(task)

  task.taskSteps.map((currentStep, stepIndex) => {
    //Parameters(Step, StepIndex, InMainSection)
    taskSteps.append(renderStep(currentStep, stepIndex, true));

  })

  return clone;
}
