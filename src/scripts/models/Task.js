import { format } from "date-fns";

export class Task {
  constructor(title, dueDate, progress = 0, taskSteps = []) {
    this._title = title;
    this._dueDate = dueDate;
    this._progress = progress;
    this._taskSteps = taskSteps;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get dueDate() {
    return format(this._dueDate, 'dd/MM/yyyy');
  }

  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  get progress() {
    let milestone = 100 / this._taskSteps.length;
    let doneSteps = this._taskSteps.filter(step => step._status == true);

    return Number(milestone * doneSteps.length).toFixed(2) + '%';
  }

  set progress(newProgress) {
    this._progress = newProgress;
  }

  get taskSteps() {
    return this._taskSteps;
  }

  set taskSteps(newTaskSteps) {
    this._taskSteps = newTaskSteps;
  }

  addStep(newStep) {
    this._taskSteps.push(newStep);
  }

  removeStep(stepIndex) {
    this._taskSteps.splice(stepIndex, 1);
  }
}