export class Project {
  constructor(title, description, dueDate, priority = 'medium', projectTasks = []) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._projectTasks = projectTasks;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  get priority() {
    return this._priority;
  }

  set priority(newPriotiy) {
    this._priority = newPriotiy;
  }

  get projectTasks(){
    return this._projectTasks;
  }

  set projectTasks(newProjectTasks){
    this._priority = newProjectTasks;
  }

  addTask(newTask) {
    this._projectTasks.push(newTask);
  }

  removeTask(taskIndex) {
    this._projectTasks.splice(taskIndex, 1);
  }

  logProject(){
    return `
      --- ${this._title} ---

      Description: "${this._description}"

      dueDate: ${this._dueDate}

      Priority: ${this._priority}
    `
  }
}