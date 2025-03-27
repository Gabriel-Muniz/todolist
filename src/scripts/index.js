import "../styles/reset.css";
import { Project } from "./models/Projects";
console.log('%c Working', 'color: lightgreen');

let project1 = new Project('Projeto de estudar matemática', 'Projeto de teste', '2025-05-08', 'high');

console.log(project1.logProject());