import { Project } from "../models/Projects";
import { Task } from "../models/Task";
import { Step } from "../models/Step";

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function checkLocalStorage() {
  if (!localStorage.getItem('projects')) {

    let project1 = new Project('Clean my room', 'Clean my study space, clean my room and organize my wardrobe', '2025-05-10', 'high');

    let task1 = new Task('Organize my wardrobe', '2025-05-10');

    let step1 = new Step('Take out the clothes');
    let step2 = new Step('Clean shelves');
    let step3 = new Step('Fold clothes');
    let step4 = new Step('Put away the clothes')

    project1.addTask(task1);
    task1.addStep(step1);
    task1.addStep(step2);
    task1.addStep(step3);
    task1.addStep(step4);

    let task2 = new Task('Clean my study space', '2025-05-10');

    let step5 = new Step('Throw away trash');
    let step6 = new Step('Clean table');
    let step7 = new Step('Organize stuff');

    project1.addTask(task2);
    task2.addStep(step5);
    task2.addStep(step6);
    task2.addStep(step7);

    let task3 = new Task('Clean my room floor', '2025-05-10');

    let step8 = new Step('Sweep the floor');
    let step9 = new Step('Mop the floor');

    project1.addTask(task3);
    task3.addStep(step8);
    task3.addStep(step9);


    let task4 = new Task('Make my bed', '2025-05-10');

    let step10 = new Step('Straighten the sheet');
    let step11 = new Step('Add the blanket or comforter');
    let step12 = new Step('Arrange the pillows');

    project1.addTask(task4);
    task4.addStep(step10);
    task4.addStep(step11);
    task4.addStep(step12);

    let project2 = new Project('Get fit', 'Weekly running at the morning with my friend Nando', '2025-05-10', 'medium');

    let task5 = new Task('Run at the morning', '2025-05-10');

    let step13 = new Step('Eat breakfast', true);
    let step14 = new Step('Get ready (put clothes)');
    let step15 = new Step('RUN!')

    project2.addTask(task5);
    task5.addStep(step13);
    task5.addStep(step14);
    task5.addStep(step15);

    let projects = [];

    projects.push(project1, project2)

    localStorage.setItem('projects', JSON.stringify(projects));
    
  }
}



export function deserializeProjects() {
  let jsonData = JSON.parse(localStorage.getItem('projects'));

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