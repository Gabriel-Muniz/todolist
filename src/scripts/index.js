import "../styles/reset.css";
import "../styles/main.css";

import { Project } from "./models/Projects";
import { Step } from "./models/Step";
import { Task } from "./models/Task";

import { renderSidebarProjects } from "./modules/projectView";

let project1 = new Project('Projeto de estudar matemática', 'Projeto de teste', '2025-05-08', 'high');

let task1 = new Task('Task de teste', '2025-04-15', 0)

let step1 = new Step('Step de teste 1', true);
let step2 = new Step('Step de teste 2', true)
let step3 = new Step('Step de teste 3', true)

let project2 = new Project('Projeto de trabalhar', 'Projeto de teste 2', '2000/05/08', 'low');

let task2 = new Task('Task de teste 2', '08-04-2025');

let step4 = new Step('Step de teste 4');
let step5 = new Step('Step de teste 5');

let task3 = new Task('Task de teste 3', '04-14-2025');
let step6 = new Step('Step de teste 6', true);
let step7 = new Step('Step de teste 7');

task3.addStep(step6);
task3.addStep(step7);

project2.addTask(task3);

task2.addStep(step4);
task2.addStep(step5);

project2.addTask(task2)

project1.addTask(task1);
task1.addStep(step1);
task1.addStep(step2);
task1.addStep(step3);

let projects = [];

projects.push(project1);

projects.push(project2);

let stringifiedProjects = JSON.stringify(projects);


function deserializeProjects(jsonString) {
  let jsonData = JSON.parse(jsonString);

  return jsonData.map(projectData => {
    const project = new Project(projectData._title, projectData._description, projectData._dueDate, projectData._priority);

    project.projectTasks = projectData._projectTasks.map(taskData => {
      const task = new Task(taskData._title, taskData._dueDate, taskData._progress);

      task.taskSteps = taskData._taskSteps.map(stepData => new Step(stepData._title, stepData._status))

      return task;
    })

    return project;
  })
}

// console.log(reparsedProjects);

projects = deserializeProjects(stringifiedProjects);
console.log(projects[1].projectTasks[0].dueDate);

renderSidebarProjects(projects);