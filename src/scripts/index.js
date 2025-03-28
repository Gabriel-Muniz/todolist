import "../styles/reset.css";
import { Project } from "./models/Projects";
import { Step } from "./models/Step";
import { Task } from "./models/Task";
console.log('%c Working', 'color: lightgreen');

let project1 = new Project('Projeto de estudar matemática', 'Projeto de teste', '2025-05-08', 'high');

let task1 = new Task('Task de teste', '2005-25-06', 0)

let step1 = new Step('Step de teste')

step1.changeStatus();
task1.addStep(step1);

project1.addTask(task1)

console.log(project1);

console.log(project1.logProject());