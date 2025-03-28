export class Step{
  constructor(title, status = false){
    this._title = title;
    this._status = status;
  }

  get title(){
    return this._title;
  }

  set title(newTitle){
    this._title = newTitle
  }

  changeStatus(){
    this._status = !this._status;
  }
}