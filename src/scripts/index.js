import "../styles/reset.css";
import { Project } from "./models/Projects";
import { Step } from "./models/Step";
import { Task } from "./models/Task";
console.log('%c Working', 'color: lightgreen');

let project1 = new Project('Projeto de estudar matemática', 'Projeto de teste', '2025-05-08', 'high');

let task1 = new Task('Task de teste', '2005-25-06', 0)

let step1 = new Step('Step de teste')

project1.addTask(task1);
task1.addStep(step1);

let projects = [];

projects.push(project1);

let project2 = project1;
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

console.log(stringifiedProjects);
// console.log(reparsedProjects);

projects = deserializeProjects(stringifiedProjects);

console.log(projects)

projects[0].title = 'Titulo mudado via set';

projects[0].projectTasks[0]._progress = 69;

console.log(projects)
