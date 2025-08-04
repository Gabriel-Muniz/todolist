# Must have

- "todos" are going to be objects created dynamically. Using function factories or cronstructors classes.
- **Projects** must have: **title**, **description**, **dueDate**, **priority** and projectTasks\[](Array containing all tasks related to the project)
- **Tasks** must have: title, dueDate, progress and taskSteps\[](Array containing all steps related to the project)
- **Steps** must have: title and status(boolean)

## Classes

class Project

```
addTask();
removeTask();
```

class Task

```
addStep();
removeStep();
```

class Step

```
changeStatus()
```

## Studys to-do

- [Deserialization](https://javascript.info/json#using-reviver)
- Two way binding
- [date-fns](https://github.com/date-fns/date-fns)

## to-do

Work on sidebar and mainSection desync

- Problably need to apply eventListeners to the window and not the body/sidebar

# ---> REFAC DUEDATE ON TASKS <---

INDEXANDO ERRADO VISIBILIDADE DE TASKS
Ao fazer a exclusão de uma task, a taske anterior pega o valor de visible da task antiga
