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
  if (localStorage.getItem('projects')) return;

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

export function setActiveProject(projectIndex){
  localStorage.setItem('activeProjectIndex', projectIndex);
}

export function getLastActiveProject(){  
  return localStorage.getItem('activeProjectIndex');
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

export function updateLocalStorage(updatedProjects) {
  const stringifiedProjects = JSON.stringify(updatedProjects);
  localStorage.removeItem('projects');
  localStorage.setItem('projects', stringifiedProjects)
}

export function getStringifiedProjects() {
  return JSON.stringify(localStorage.getItem('projects'));
}

export function getRandomNewProject(){
  const placeHolderProjects = [
    {
      _title: "Aprender JavaScript",
      _description: "Estudar os fundamentos de JavaScript e praticar com pequenos projetos.",
      _dueDate: "2025-06-15",
      _priority: "alta",
      _projectTasks: [
        {
          _title: "Ler sobre variáveis e tipos de dados",
          _dueDate: "2025-06-10",
          _progress: 0,
          _taskSteps: [
            { _title: "Variáveis var, let e const", _status: false },
            { _title: "Tipos primitivos", _status: false }
          ]
        },
        {
          _title: "Praticar loops e condicionais",
          _dueDate: "2025-06-12",
          _progress: 0,
          _taskSteps: [
            { _title: "Escrever exemplos com for e while", _status: false },
            { _title: "Criar exercícios com if/else", _status: false }
          ]
        }
      ]
    },
    {
      _title: "Organizar o escritório",
      _description: "Melhorar o ambiente de trabalho para aumentar a produtividade.",
      _dueDate: "2025-06-20",
      _priority: "média",
      _projectTasks: [
        {
          _title: "Limpar a mesa",
          _dueDate: "2025-06-18",
          _progress: 0,
          _taskSteps: [
            { _title: "Remover objetos desnecessários", _status: false },
            { _title: "Limpar a superfície com pano úmido", _status: false }
          ]
        },
        {
          _title: "Organizar cabos",
          _dueDate: "2025-06-19",
          _progress: 0,
          _taskSteps: [
            { _title: "Separar cabos por tipo", _status: false },
            { _title: "Utilizar organizadores de cabos", _status: false }
          ]
        }
      ]
    },
    {
      _title: "Planejar viagem de férias",
      _description: "Organizar todos os detalhes para as próximas férias.",
      _dueDate: "2025-07-01",
      _priority: "alta",
      _projectTasks: [
        {
          _title: "Escolher destino",
          _dueDate: "2025-06-25",
          _progress: 0,
          _taskSteps: [
            { _title: "Pesquisar opções de destinos", _status: false },
            { _title: "Comparar custos e atrações", _status: false }
          ]
        },
        {
          _title: "Reservar hospedagem",
          _dueDate: "2025-06-27",
          _progress: 0,
          _taskSteps: [
            { _title: "Procurar hotéis ou apartamentos", _status: false },
            { _title: "Fazer reserva online", _status: false }
          ]
        }
      ]
    },
    {
      _title: "Desenvolver aplicativo pessoal",
      _description: "Criar um aplicativo para gerenciamento de tarefas pessoais.",
      _dueDate: "2025-08-15",
      _priority: "alta",
      _projectTasks: [
        {
          _title: "Definir funcionalidades principais",
          _dueDate: "2025-07-10",
          _progress: 0,
          _taskSteps: [
            { _title: "Listar requisitos do aplicativo", _status: false },
            { _title: "Criar wireframes das telas", _status: false }
          ]
        },
        {
          _title: "Implementar backend",
          _dueDate: "2025-07-25",
          _progress: 0,
          _taskSteps: [
            { _title: "Configurar servidor e banco de dados", _status: false },
            { _title: "Desenvolver API REST", _status: false }
          ]
        }
      ]
    },
    {
      _title: "Curso de fotografia",
      _description: "Participar de um curso para melhorar habilidades fotográficas.",
      _dueDate: "2025-09-01",
      _priority: "média",
      _projectTasks: [
        {
          _title: "Aulas teóricas",
          _dueDate: "2025-08-15",
          _progress: 0,
          _taskSteps: [
            { _title: "Estudar composição e iluminação", _status: false },
            { _title: "Aprender sobre configurações da câmera", _status: false }
          ]
        },
        {
          _title: "Práticas fotográficas",
          _dueDate: "2025-08-25",
          _progress: 0,
          _taskSteps: [
            { _title: "Sessão de fotos ao ar livre", _status: false },
            { _title: "Análise e edição das fotos", _status: false }
          ]
        }
      ]
    }
  ];
  
  return placeHolderProjects[Math.floor(Math.random() * 4)];
}